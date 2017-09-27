var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/search', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');

  // And insert something like this instead:
  res.json({
    'numHits':4,
    'results':[
        {
          'id':1,
          'title':'Rocky 1',
          'img':'https://s3-eu-west-1.amazonaws.com/imdbimages/images/MV5BMTY5MDMzODUyOF5BMl5BanBnXkFtZTcwMTQ3NTMyNA@@._V1_SX300.jpg',
          'description': 'Rocky is a 1976 American sports drama film directed by John G. Avildsen and both written by and starring Sylvester Stallone.'
        },
        {
          'id':2,
          'title':'Rocky Balboa',
          'img':'https://s3-eu-west-1.amazonaws.com/imdbimages/images/MV5BMTM2OTUzNDE3NV5BMl5BanBnXkFtZTcwODczMzkzMQ@@._V1_SX300.jpg',
          'description': 'Robert "Rocky" Balboa is the title character of the Rocky series. The character was created by Sylvester Stallone, who also portrayed him in all seven Rocky films.'
        },
        {
          'id':3,
          'title':'Pulp Fiction',
          'img':'https://s3-eu-west-1.amazonaws.com/imdbimages/images/MV5BMjE0ODk2NjczOV5BMl5BanBnXkFtZTYwNDQ0NDg4._V1_SX300.jpg',
          'description': 'Pulp Fiction is a 1994 American black comedy neo-noir crime film written and directed by Quentin Tarantino, from a story by Tarantino and Roger Avary.'
        },
        {
          'id':4,
          'title':'Apocalypse Now',
          'img':'https://s3-eu-west-1.amazonaws.com/imdbimages/images/MV5BMTcyMzQ5NDM4OV5BMl5BanBnXkFtZTcwODUwNDg3OA@@._V1_SX300.jpg',
          'description': 'Apocalypse Now is a 1979 American epic war film directed, produced, and co-written by Francis Ford Coppola.'
        }
      ],
    'facets': [
      {
          'field':'actors',
          'type':'string_drilldown',
          'label':'Actors',
          'values':[
            {value:"Dustin Hoffman",count:45},
            {value:"Russell Crowe",count:41},
            {value:"Richard Webber",count:34},
            {value:"Gene Hackman",count:23},
            {value:"Demi Moore",count:17},
            {value:"Nicole Kidman",count:8}
          ]
      },
      {
          'field':'categories',
          'type':'string_drilldown',
          'label':'Categories',
          'values':[
            {value:"Movie",count:45},
            {value:"Episode",count:41},
            {value:"Series",count:34},
            {value:"Genre",count:23}
          ]
      },
      {
          'field':'writers',
          'type':'string_drilldown',
          'label':'Writers',
          'values':[
            {value:"Movie",count:45},
            {value:"Episode",count:41},
            {value:"Series",count:34},
            {value:"Genre",count:23}
          ]
      }
    ]
  });
});

module.exports = router;
