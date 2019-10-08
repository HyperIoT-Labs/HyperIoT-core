/**
 * OpenAPI spec version: 2.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface Widget { 
    id?: number;
    entityVersion: number;
    readonly entityCreateDate?: Date;
    readonly entityModifyDate?: Date;
    categoryIds?: Array<number>;
    tagIds?: Array<number>;
    name?: string;
    widgetCategory?: Widget.WidgetCategoryEnum;
    domains?: Array<Widget.DomainsEnum>;
    baseConfig?: string;
    type?: string;
    cols?: number;
    rows?: number;
    image?: Array<string>;
    avgRating?: number;
}
export namespace Widget {
    export type WidgetCategoryEnum = 'ALL' | 'BAR' | 'LINE' | 'PIE' | 'RADAR' | 'GAUGES' | 'MAP' | 'ACTION' | 'TABLES';
    export const WidgetCategoryEnum = {
        ALL: 'ALL' as WidgetCategoryEnum,
        BAR: 'BAR' as WidgetCategoryEnum,
        LINE: 'LINE' as WidgetCategoryEnum,
        PIE: 'PIE' as WidgetCategoryEnum,
        RADAR: 'RADAR' as WidgetCategoryEnum,
        GAUGES: 'GAUGES' as WidgetCategoryEnum,
        MAP: 'MAP' as WidgetCategoryEnum,
        ACTION: 'ACTION' as WidgetCategoryEnum,
        TABLES: 'TABLES' as WidgetCategoryEnum
    };
    export type DomainsEnum = 'INDUSTRY_40' | 'SMART_FIELDS' | 'HEALTH' | 'IOT';
    export const DomainsEnum = {
        INDUSTRY40: 'INDUSTRY_40' as DomainsEnum,
        SMARTFIELDS: 'SMART_FIELDS' as DomainsEnum,
        HEALTH: 'HEALTH' as DomainsEnum,
        IOT: 'IOT' as DomainsEnum
    };
}
