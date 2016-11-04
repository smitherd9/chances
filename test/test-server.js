var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;


chai.use(chaiHttp);


describe('chances', function() {
    it('should return status code 200 and HTML on GET', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                if (err) {
                    return res.status(404).json({
                    message: 'Not Found'
                    });
                }
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
   
});



describe('about', function() {
    it('should return status code 200 and HTML on GET', function(done) {
        chai.request(app)
            .get('/about.html')
            .end(function(err, res) {
                if (err) {
                    return res.status(404).json({
                    message: 'Not Found'
                    });
                }
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
   
});


