/**
 * hyperiot Algorithm
 * HyperIoT Algorithm API
 *
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { Algorithm } from '../../../models/algorithm';
import { AlgorithmConfig } from '../../../models/algorithmConfig';
import { AlgorithmOutputField } from '../../../models/algorithmOutputField';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../../../models/configuration';


@Injectable()
export class AlgorithmsService {

    protected basePath = '/hyperiot/algorithms';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * /hyperiot/algorithms/{id}/outputFields
     * Service for adding output field
     * @param id The algorithm which must be updated
     * @param body The output field which must be added
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addOutputField(id: number, body: AlgorithmOutputField, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public addOutputField(id: number, body: AlgorithmOutputField, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public addOutputField(id: number, body: AlgorithmOutputField, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public addOutputField(id: number, body: AlgorithmOutputField, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling addOutputField.');
        }

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling addOutputField.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/${encodeURIComponent(String(id))}/outputFields`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /module/status
     * Simple service for checking module status
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public checkModuleWorking(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public checkModuleWorking(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public checkModuleWorking(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public checkModuleWorking(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/module/status`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/algorithms/{id}
     * Service for deleting a algorithm entity
     * @param id The algorithm id which must be deleted
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteAlgorithm(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteAlgorithm(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteAlgorithm(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteAlgorithm(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteAlgorithm.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];

        return this.httpClient.delete<any>(`${this.basePath}/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/algorithms/{id}/outputFields/{outputFieldId}
     * Service for deleting output field
     * @param id The algorithm which must be updated
     * @param outputFieldId The output field which must be deleted
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteOutputField(id: number, outputFieldId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public deleteOutputField(id: number, outputFieldId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public deleteOutputField(id: number, outputFieldId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public deleteOutputField(id: number, outputFieldId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteOutputField.');
        }

        if (outputFieldId === null || outputFieldId === undefined) {
            throw new Error('Required parameter outputFieldId was null or undefined when calling deleteOutputField.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<any>(`${this.basePath}/${encodeURIComponent(String(id))}/outputFields/${encodeURIComponent(String(outputFieldId))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/algorithms/{id}
     * Service for finding algorithm
     * @param id 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findAlgorithm(id: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public findAlgorithm(id: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public findAlgorithm(id: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public findAlgorithm(id: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling findAlgorithm.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/algorithms/all
     * Service for finding all algorithm entities
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findAllAlgorithm(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public findAllAlgorithm(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public findAllAlgorithm(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public findAllAlgorithm(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/all`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/algorithms
     * Service for finding all algorithm entities
     * @param delta 
     * @param page 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public findAllAlgorithmPaginated(delta?: number, page?: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public findAllAlgorithmPaginated(delta?: number, page?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public findAllAlgorithmPaginated(delta?: number, page?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public findAllAlgorithmPaginated(delta?: number, page?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {



        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (delta !== undefined && delta !== null) {
            queryParameters = queryParameters.set('delta', <any>delta);
        }
        if (page !== undefined && page !== null) {
            queryParameters = queryParameters.set('page', <any>page);
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/algorithms/{algorithmId}/baseConfig
     * Service for getting base configuration of algorithm
     * @param algorithmId Algorithm ID
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getBaseConfig(algorithmId: number, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public getBaseConfig(algorithmId: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public getBaseConfig(algorithmId: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public getBaseConfig(algorithmId: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (algorithmId === null || algorithmId === undefined) {
            throw new Error('Required parameter algorithmId was null or undefined when calling getBaseConfig.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<any>(`${this.basePath}/${encodeURIComponent(String(algorithmId))}/baseConfig`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/algorithms
     * Service for adding a new algorithm entity
     * @param body Algorithm entity which must be saved 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public saveAlgorithm(body: Algorithm, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public saveAlgorithm(body: Algorithm, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public saveAlgorithm(body: Algorithm, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public saveAlgorithm(body: Algorithm, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling saveAlgorithm.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/algorithms
     * Service for updating a algorithm entity
     * @param body Algorithm entity which must be updated 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateAlgorithm(body: Algorithm, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateAlgorithm(body: Algorithm, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateAlgorithm(body: Algorithm, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateAlgorithm(body: Algorithm, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateAlgorithm.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<any>(`${this.basePath}/`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/algorithms/{algorithmId}/baseConfig
     * Service for updating base configuration of algorithm
     * @param algorithmId Algorithm ID which updates base configuration for
     * @param body Base config
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateBaseConfig(algorithmId: number, body: AlgorithmConfig, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateBaseConfig(algorithmId: number, body: AlgorithmConfig, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateBaseConfig(algorithmId: number, body: AlgorithmConfig, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateBaseConfig(algorithmId: number, body: AlgorithmConfig, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (algorithmId === null || algorithmId === undefined) {
            throw new Error('Required parameter algorithmId was null or undefined when calling updateBaseConfig.');
        }

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateBaseConfig.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<any>(`${this.basePath}/${encodeURIComponent(String(algorithmId))}/baseConfig`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/algorithms/{algorithmId}/jar
     * Service for updating jar of algorithm
     * @param algorithmId Algorithm ID which updates jar for
     * @param body Jar file 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateJar(algorithmId: number, body: Blob, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateJar(algorithmId: number, body: Blob, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateJar(algorithmId: number, body: Blob, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateJar(algorithmId: number, body: Blob, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (algorithmId === null || algorithmId === undefined) {
            throw new Error('Required parameter algorithmId was null or undefined when calling updateJar.');
        }

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateJar.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<any>(`${this.basePath}/${encodeURIComponent(String(algorithmId))}/jar`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * /hyperiot/algorithms/{id}/outputFields
     * Service for updating output field
     * @param id The algorithm which must be updated
     * @param body The output field which must be updated
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public updateOutputField(id: number, body: AlgorithmOutputField, observe?: 'body', reportProgress?: boolean): Observable<any>;
    public updateOutputField(id: number, body: AlgorithmOutputField, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public updateOutputField(id: number, body: AlgorithmOutputField, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public updateOutputField(id: number, body: AlgorithmOutputField, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling updateOutputField.');
        }

        if (body === null || body === undefined) {
            throw new Error('Required parameter body was null or undefined when calling updateOutputField.');
        }

        let headers = this.defaultHeaders;

        // authentication (jwt-auth) required
        if (this.configuration.apiKeys["AUTHORIZATION"]) {
            headers = headers.set('AUTHORIZATION', this.configuration.apiKeys["AUTHORIZATION"]);
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<any>(`${this.basePath}/${encodeURIComponent(String(id))}/outputFields`,
            body,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
