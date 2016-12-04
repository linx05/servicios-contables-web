import angular from 'angular';
import storage from 'angular-storage';
import jwt from 'angular-jwt';


import ApiService from './api.service';
import AuthService from './auth.service';
import ResourceService from './resource.service';
import QueryBuilderService from './query-builder.service';

const services = angular
	.module('app.services', [
		storage,
		jwt
	])
	.service({
		ApiService,
		AuthService,
        ResourceService,
        QueryBuilderService
	})
	.name;

export default services;
