import * as common from "oci-common";
import * as objectStorage from "oci-objectstorage";
import { OCI_OBJECT_STORAGE_BUCKET, OCI_OBJECT_STORAGE_NAMESPACE, } from "../../../config/config.js";
const provider = new common.ConfigFileAuthenticationDetailsProvider();
const client = new objectStorage.ObjectStorageClient({
    authenticationDetailsProvider: provider,
});
export async function uploadObject(objectName, data, contentType) {
    await client.putObject({
        namespaceName: OCI_OBJECT_STORAGE_NAMESPACE,
        bucketName: OCI_OBJECT_STORAGE_BUCKET,
        objectName,
        putObjectBody: data,
        contentLength: data.length,
        contentType,
    });
}
