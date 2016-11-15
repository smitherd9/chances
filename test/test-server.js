var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var nock = require('nock');

var should = chai.should();
var app = server.app;


chai.use(chaiHttp);


describe('ZIP', function() {

    nock(/cityofnewyork\.us/)
        .get(/resource/)
        .reply(200, [{
            action: 'Violations were cited in the following area(s).',
            boro: 'MANHATTAN',
            building: '1411',
            camis: '50004862',
            critical_flag: 'Not Critical',
            cuisine_description: 'Thai',
            dba: 'UP THAI',
            grade: 'A',
            grade_date: '2014-12-22T00:00:00.000',
            inspection_date: '2014-12-22T00:00:00.000',
            inspection_type: 'Cycle Inspection / Initial Inspection',
            phone: '2122561188',
            record_date: '2016-11-13T06:01:51.000',
            score: '12',
            street: '2ND AVE',
            violation_code: '10F',
            violation_description: 'Non-food contact surface improperly constructed. Unacceptable material used. Non-food contact surface or equipment improperly maintained and/or not properly sealed, raised, spaced or movable to allow accessibility for cleaning on all sides, above and underneath the unit.',
            zipcode: '10021'
        }, {
            action: 'Violations were cited in the following area(s).',
            boro: 'MANHATTAN',
            building: '1411',
            camis: '50004862',
            critical_flag: 'Critical',
            cuisine_description: 'Thai',
            dba: 'UP THAI',
            inspection_date: '2016-09-21T00:00:00.000',
            inspection_type: 'Cycle Inspection / Initial Inspection',
            phone: '2122561188',
            record_date: '2016-11-13T06:01:51.000',
            score: '20',
            street: '2ND AVE',
            violation_code: '02G',
            violation_description: 'Cold food item held above 41Âº F (smoked fish and reduced oxygen packaged foods above 38 ÂºF) except during necessary preparation.',
            zipcode: '10021'
        }]);

    it('should return status code 200 json on GET', function(done) {
        chai.request(app)
            .get('/zip/10021')
            .end(function(err, res) {
                if (err) {
                    return res.status(404).json({
                        message: 'Not Found'
                    });
                }
                console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.grade.should.eql(['A']);
                res.body.score.should.be.a('array');
                res.body.should.be.a('object');
                res.body.should.have.property('chancesRating');
                res.body.should.have.property('score');
                res.body.should.have.property('vioDesc');
                res.body.chancesRating.should.be.a('number');
                res.body.vioDesc.should.be.a('array');
                res.body.chancesRating.should.eql(3);


                done();
            });
    });
});

describe('DBA', function() {

    nock(/cityofnewyork\.us/)
        .get(/resource/)
        .reply(200, [{
            action: 'Violations were cited in the following area(s).',
            boro: 'MANHATTAN',
            building: '1411',
            camis: '50004862',
            critical_flag: 'Not Critical',
            cuisine_description: 'Thai',
            dba: 'UP THAI',
            grade: 'A',
            grade_date: '2014-12-22T00:00:00.000',
            inspection_date: '2014-12-22T00:00:00.000',
            inspection_type: 'Cycle Inspection / Initial Inspection',
            phone: '2122561188',
            record_date: '2016-11-13T06:01:51.000',
            score: '12',
            street: '2ND AVE',
            violation_code: '10F',
            violation_description: 'Non-food contact surface improperly constructed. Unacceptable material used. Non-food contact surface or equipment improperly maintained and/or not properly sealed, raised, spaced or movable to allow accessibility for cleaning on all sides, above and underneath the unit.',
            zipcode: '10021'
        }, {
            action: 'Violations were cited in the following area(s).',
            boro: 'MANHATTAN',
            building: '1411',
            camis: '50004862',
            critical_flag: 'Critical',
            cuisine_description: 'Thai',
            dba: 'UP THAI',
            inspection_date: '2016-09-21T00:00:00.000',
            inspection_type: 'Cycle Inspection / Initial Inspection',
            phone: '2122561188',
            record_date: '2016-11-13T06:01:51.000',
            score: '20',
            street: '2ND AVE',
            violation_code: '02G',
            violation_description: 'Cold food item held above 41Âº F (smoked fish and reduced oxygen packaged foods above 38 ÂºF) except during necessary preparation.',
            zipcode: '10021'
        }]);

    it('should return status code 200 json on GET', function(done) {
        chai.request(app)
            .get('/dba/UP%20THAI')
            .end(function(err, res) {
                if (err) {
                    return res.status(404).json({
                        message: 'Not Found'
                    });
                }
                console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.grade.should.eql(['A']);
                res.body.score.should.be.a('array');
                res.body.should.be.a('object');
                res.body.should.have.property('chancesRating');
                res.body.should.have.property('score');
                res.body.should.have.property('vioDesc');
                res.body.chancesRating.should.be.a('number');
                res.body.vioDesc.should.be.a('array');
                res.body.chancesRating.should.eql(3);


                done();
            });
    });
});

describe('CUISINE', function() {
    nock(/cityofnewyork\.us/)
        .get(/resource/)
        .reply(200, [{
            action: 'Violations were cited in the following area(s).',
            boro: 'MANHATTAN',
            building: '1411',
            camis: '50004862',
            critical_flag: 'Not Critical',
            cuisine_description: 'Thai',
            dba: 'UP THAI',
            grade: 'A',
            grade_date: '2014-12-22T00:00:00.000',
            inspection_date: '2014-12-22T00:00:00.000',
            inspection_type: 'Cycle Inspection / Initial Inspection',
            phone: '2122561188',
            record_date: '2016-11-13T06:01:51.000',
            score: '12',
            street: '2ND AVE',
            violation_code: '10F',
            violation_description: 'Non-food contact surface improperly constructed. Unacceptable material used. Non-food contact surface or equipment improperly maintained and/or not properly sealed, raised, spaced or movable to allow accessibility for cleaning on all sides, above and underneath the unit.',
            zipcode: '10021'
        }, {
            action: 'Violations were cited in the following area(s).',
            boro: 'MANHATTAN',
            building: '1411',
            camis: '50004862',
            critical_flag: 'Critical',
            cuisine_description: 'Thai',
            dba: 'UP THAI',
            inspection_date: '2016-09-21T00:00:00.000',
            inspection_type: 'Cycle Inspection / Initial Inspection',
            phone: '2122561188',
            record_date: '2016-11-13T06:01:51.000',
            score: '20',
            street: '2ND AVE',
            violation_code: '02G',
            violation_description: 'Cold food item held above 41Âº F (smoked fish and reduced oxygen packaged foods above 38 ÂºF) except during necessary preparation.',
            zipcode: '10021'
        }]);

    it('should return status code 200 json on GET', function(done) {
        chai.request(app)
            .get('/cuisine/THAI')
            .end(function(err, res) {
                if (err) {
                    return res.status(404).json({
                        message: 'Not Found'
                    });
                }
                console.log(res.body);
                res.should.have.status(200);
                res.should.be.json;
                res.body.grade.should.eql(['A']);
                res.body.score.should.be.a('array');
                res.body.should.be.a('object');
                res.body.should.have.property('chancesRating');
                res.body.should.have.property('score');
                res.body.should.have.property('vioDesc');
                res.body.chancesRating.should.be.a('number');
                res.body.vioDesc.should.be.a('array');
                res.body.chancesRating.should.eql(3);


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
