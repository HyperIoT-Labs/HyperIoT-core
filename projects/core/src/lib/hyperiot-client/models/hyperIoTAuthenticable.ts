/**
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { HyperIoTRole } from './hyperIoTRole';


export interface HyperIoTAuthenticable { 
    screenName?: string;
    roles?: Array<HyperIoTRole>;
    tagIds?: Array<number>;
    categoryIds?: Array<number>;
    systemApiClassName?: string;
    entityCreateDate?: Date;
    id?: number;
    entityVersion?: number;
    resourceName?: string;
}
