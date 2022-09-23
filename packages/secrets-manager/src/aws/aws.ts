import { SecretsManager } from "@aws-sdk/client-secrets-manager";
import type { SecretsManager as Configuration } from "@aws-sdk/client-secrets-manager";

// import { Get } from "@aws-sdk/client-secrets-manager";
// import { GetObjectCommandInput } from "@aws-sdk/client-secrets-manager";
// import { GetObjectCommandOutput } from "@aws-sdk/client-secrets-manager";
//
// import { ListBucketsCommand } from "@aws-sdk/client-secrets-manager";
// import { ListBucketsCommandInput } from "@aws-sdk/client-secrets-manager";
// import { ListBucketsCommandOutput } from "@aws-sdk/client-secrets-manager";
//
// import { ListObjectsCommand } from "@aws-sdk/client-secrets-manager";
// import { ListObjectsCommandInput } from "@aws-sdk/client-secrets-manager";
// import { ListObjectsCommandOutput } from "@aws-sdk/client-secrets-manager";
//
// import { ListObjectsV2Command } from "@aws-sdk/client-secrets-manager";
// import { ListObjectsV2CommandInput } from "@aws-sdk/client-secrets-manager";
// import { ListObjectsV2CommandOutput } from "@aws-sdk/client-secrets-manager";
//
// import { GetBucketEncryptionCommand } from "@aws-sdk/client-secrets-manager";
// import { GetBucketEncryptionCommandInput } from "@aws-sdk/client-secrets-manager";
// import { GetBucketEncryptionCommandOutput } from "@aws-sdk/client-secrets-manager";
//
// import { GetBucketLifecycleConfigurationCommand } from "@aws-sdk/client-secrets-manager";
// import { GetBucketLifecycleConfigurationCommandInput } from "@aws-sdk/client-secrets-manager";
// import { GetBucketLifecycleConfigurationCommandOutput } from "@aws-sdk/client-secrets-manager";
//
// import { GetBucketAclCommand } from "@aws-sdk/client-secrets-manager";
// import { GetBucketAclCommandInput } from "@aws-sdk/client-secrets-manager";
// import { GetBucketAclCommandOutput } from "@aws-sdk/client-secrets-manager";
//
// import { GetBucketVersioningCommand } from "@aws-sdk/client-secrets-manager";
// import { GetBucketVersioningCommandInput } from "@aws-sdk/client-secrets-manager";
// import { GetBucketVersioningCommandOutput } from "@aws-sdk/client-secrets-manager";
//
// import { GetBucketTaggingCommand } from "@aws-sdk/client-secrets-manager";
// import { GetBucketTaggingCommandInput } from "@aws-sdk/client-secrets-manager";
// import { GetBucketTaggingCommandOutput } from "@aws-sdk/client-secrets-manager";

export module AWS {
    export interface INI {
        accessKeyId: string;
        secretAccessKey: string;
        profile: string;
    }

    export const Interface = {
        Client: {
            SM: SecretsManager
        }
    };

    export type Types = {
        Client: {
            SM: SecretsManager,
            Configuration: Configuration
        }
    };

}

export default AWS;