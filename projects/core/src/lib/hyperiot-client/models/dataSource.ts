/**
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { InputStream } from './inputStream';
import { OutputStream } from './outputStream';


export interface DataSource { 
    name?: string;
    inputStream?: InputStream;
    contentType?: string;
    outputStream?: OutputStream;
}
