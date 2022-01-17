const chai = require("chai");
const makeRequest = require("supertest");
const mocha = require("mocha");
const http = require('http');


exports.expect = chai.expect;
exports.mk = makeRequest;
exports.API_ROOT = `http://localhost:4002/api/v1`;