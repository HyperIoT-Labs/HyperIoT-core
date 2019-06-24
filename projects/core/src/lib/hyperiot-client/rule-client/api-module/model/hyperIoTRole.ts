/**
 * HyperIoT Rule
 * HyperIoT Rule API
 *
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { HyperIoTBaseEntity } from './hyperIoTBaseEntity';


export interface HyperIoTRole { 
    name?: string;
    id?: number;
    categoryIds?: Array<number>;
    tagIds?: Array<number>;
    systemApiClassName?: string;
    parent?: HyperIoTBaseEntity;
    resourceName?: string;
}
