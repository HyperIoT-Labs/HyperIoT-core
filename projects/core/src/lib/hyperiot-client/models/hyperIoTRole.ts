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
    parent?: HyperIoTBaseEntity;
    id?: number;
    tagIds?: Array<number>;
    categoryIds?: Array<number>;
    systemApiClassName?: string;
    resourceName?: string;
}
