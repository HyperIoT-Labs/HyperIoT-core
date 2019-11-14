/**
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface HPacketField { 
    id?: number;
    entityVersion: number;
    readonly entityCreateDate?: Date;
    readonly entityModifyDate?: Date;
    categoryIds?: Array<number>;
    tagIds?: Array<number>;
    name?: string;
    description?: string;
    type?: HPacketField.TypeEnum;
    multiplicity?: HPacketField.MultiplicityEnum;
    unit?: string;
    parentField?: HPacketField;
    innerFields?: Array<HPacketField>;
    value?: any;
}
export namespace HPacketField {
    export type TypeEnum = 'OBJECT' | 'INTEGER' | 'DOUBLE' | 'FLOAT' | 'BOOLEAN' | 'DATE' | 'TEXT' | 'TIMESTAMP' | 'CATEGORY' | 'TAG';
    export const TypeEnum = {
        OBJECT: 'OBJECT' as TypeEnum,
        INTEGER: 'INTEGER' as TypeEnum,
        DOUBLE: 'DOUBLE' as TypeEnum,
        FLOAT: 'FLOAT' as TypeEnum,
        BOOLEAN: 'BOOLEAN' as TypeEnum,
        DATE: 'DATE' as TypeEnum,
        TEXT: 'TEXT' as TypeEnum,
        TIMESTAMP: 'TIMESTAMP' as TypeEnum,
        CATEGORY: 'CATEGORY' as TypeEnum,
        TAG: 'TAG' as TypeEnum
    };
    export type MultiplicityEnum = 'SINGLE' | 'ARRAY' | 'MATRIX';
    export const MultiplicityEnum = {
        SINGLE: 'SINGLE' as MultiplicityEnum,
        ARRAY: 'ARRAY' as MultiplicityEnum,
        MATRIX: 'MATRIX' as MultiplicityEnum
    };
}
