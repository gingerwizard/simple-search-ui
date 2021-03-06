import csv
import json, os, sys, argparse
import time
from elasticsearch import Elasticsearch
from elasticsearch.helpers import bulk
import requests
import re

parser = argparse.ArgumentParser()
parser.add_argument('--file', dest="file", required=True)
parser.add_argument('--es_proto', dest="es_proto", default="http")
parser.add_argument('--es_host', dest="es_host", required=False, default="localhost")
parser.add_argument('--es_port', dest="es_port", required=False, default=9200)
parser.add_argument('--es_user', dest="es_user", required=False, default="elastic")
parser.add_argument('--es_password', dest="es_password", required=False, default="changeme")
parser.add_argument('--chunk_size', dest="chunk_size", required=False, default=10)
parser.add_argument('--index_config', dest="index_config", default='config.json')
parser.add_argument('--index', dest="index", default='movies')
parser.add_argument('--reset', dest="reset", action='store_true')
parser.add_argument('--api_key',dest="api_key")
parser.add_argument('--start_imdb_num',dest="start_imdb_num",default=0, type=int)

def getMovieDetails(imdb_id,api_key):
    response = requests.get("http://www.omdbapi.com/?i=%s&apikey=%s"%(imdb_id,api_key))
    if response.status_code == 200:
        try:
            doc = json.loads(response.text)
            if doc['Response'] == 'True':
                return doc
        except json.decoder.JSONDecodeError:
            return None
    return None

def cleanValue(value):
    return re.sub(r'\([^)]*\)', '', value).strip()

def handle_data_file(file_path,api_key,min_imdb_num):
    with open(file_path, newline='') as csvfile:
        file_reader = csv.DictReader(csvfile, delimiter='\t')
        for row in file_reader:
            imdb_num = int(row['tconst'].replace('tt',''))
            if row['titleType'] == 'movie' and imdb_num > min_imdb_num:
                doc = getMovieDetails(row['tconst'],api_key)
                if doc and doc['Poster'] != 'N/A':
                    print(imdb_num)
                    doc['imdb_num']=imdb_num
                    doc["_id"] = row['tconst']
                    doc['Genre'] = [cleanValue(genre) for genre in doc['Genre'].split(',')]
                    doc['Actors'] = [cleanValue(actor) for actor in doc['Actors'].split(',')]
                    doc['Director'] = [cleanValue(director) for director in doc['Director'].split(',')]
                    doc['Writer'] = [cleanValue(writer) for writer in doc['Writer'].split(',')]
                    doc['Runtime'] = doc['Runtime'].replace(" min","")
                    del doc["Response"]
                    yield {k.lower(): v for k, v in doc.items()}

if __name__ == '__main__':
    args = parser.parse_args()
    es = Elasticsearch(hosts=["%s:%s" % (args.es_host, args.es_port)], http_auth=(args.es_user, args.es_password), use_ssl=True if args.es_proto.lower() == "https" else False, verify_certs=True, timeout=60)
    config = None
    if args.reset:
        print("Deleting")
        es.indices.delete(index=args.index, ignore=404)
        if os.path.isfile(args.index_config):
            with open(args.index_config, "r") as config_file:
                config = json.loads(config_file.read())
                es.indices.create(index=args.index, body=config)
    start = time.time()
    cnt = 0
    for success, info in bulk(
            es,
            handle_data_file(args.file,args.api_key,args.start_imdb_num),
            chunk_size=args.chunk_size,
            timeout="60s",
            index = args.index,
            doc_type = 'doc'
    ):
        if success:
            cnt += 1
            if cnt % 100 == 0:
                print("Indexed %s documents" % str(cnt))
                sys.stdout.flush()
        else:
            print('Doc failed', info)
    print('DONE\nIndexed %s documents in %.2f seconds' % (
        cnt, time.time() - start
    ))
    print("INDEXING COMPLETE")
    es.indices.refresh(index=args.index)
    print("DATA LOAD COMPLETE")
