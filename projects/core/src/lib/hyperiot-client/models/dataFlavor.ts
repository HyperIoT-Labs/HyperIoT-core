/**
 * OpenAPI spec version: 1.0.0
 * Contact: users@acsoftware.it
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface DataFlavor { 
    mimeType?: string;
    humanPresentableName?: string;
    primaryType?: string;
    subType?: string;
    mimeTypeSerializedObject?: boolean;
    defaultRepresentationClassAsString?: string;
    representationClassInputStream?: boolean;
    representationClassReader?: boolean;
    representationClassCharBuffer?: boolean;
    representationClassByteBuffer?: boolean;
    representationClassSerializable?: boolean;
    representationClassRemote?: boolean;
    flavorSerializedObjectType?: boolean;
    flavorRemoteObjectType?: boolean;
    flavorJavaFileListType?: boolean;
    flavorTextType?: boolean;
}
