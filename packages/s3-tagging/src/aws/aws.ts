import { S3 } from "@aws-sdk/client-s3";
import type { S3 as Configuration } from "@aws-sdk/client-s3";

import { GetObjectCommand } from "@aws-sdk/client-s3";
import { GetObjectCommandInput } from "@aws-sdk/client-s3";
import { GetObjectCommandOutput } from "@aws-sdk/client-s3";

import { ListBucketsCommand } from "@aws-sdk/client-s3";
import { ListBucketsCommandInput } from "@aws-sdk/client-s3";
import { ListBucketsCommandOutput } from "@aws-sdk/client-s3";

import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { ListObjectsCommandInput } from "@aws-sdk/client-s3";
import { ListObjectsCommandOutput } from "@aws-sdk/client-s3";

import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { ListObjectsV2CommandInput } from "@aws-sdk/client-s3";
import { ListObjectsV2CommandOutput } from "@aws-sdk/client-s3";

import { GetBucketEncryptionCommand } from "@aws-sdk/client-s3";
import { GetBucketEncryptionCommandInput } from "@aws-sdk/client-s3";
import { GetBucketEncryptionCommandOutput } from "@aws-sdk/client-s3";

import { GetBucketLifecycleConfigurationCommand } from "@aws-sdk/client-s3";
import { GetBucketLifecycleConfigurationCommandInput } from "@aws-sdk/client-s3";
import { GetBucketLifecycleConfigurationCommandOutput } from "@aws-sdk/client-s3";

import { GetBucketAclCommand } from "@aws-sdk/client-s3";
import { GetBucketAclCommandInput } from "@aws-sdk/client-s3";
import { GetBucketAclCommandOutput } from "@aws-sdk/client-s3";

import { GetBucketVersioningCommand } from "@aws-sdk/client-s3";
import { GetBucketVersioningCommandInput } from "@aws-sdk/client-s3";
import { GetBucketVersioningCommandOutput } from "@aws-sdk/client-s3";

import { GetBucketTaggingCommand } from "@aws-sdk/client-s3";
import { GetBucketTaggingCommandInput } from "@aws-sdk/client-s3";
import { GetBucketTaggingCommandOutput } from "@aws-sdk/client-s3";

export module AWS {
    export interface INI {
        accessKeyId: string;
        secretAccessKey: string;
        profile: string;
    }

    export const Interface = {
        Client: {
            S3: S3
        },
        Account: {
            List: {
                Buckets: ListBucketsCommand
            }
        },
        Bucket: {
            Get: {
                Encryption: GetBucketEncryptionCommand,
                Lifecycle: GetBucketLifecycleConfigurationCommand,
                ACL: GetBucketAclCommand,
                Versioning: GetBucketVersioningCommand,
                Tagging: GetBucketTaggingCommand,
            }
        },
        Objects: {
            Get: {
                Object: GetObjectCommand
            },
            List: {
                Objects: {
                    Legacy: ListObjectsCommand,
                    V2: ListObjectsV2Command
                }
            }
        }
    };

    export type Types = {
        Client: {
            S3: S3
        },
        Account: {
            List: {
                Buckets: {
                    Input: ListBucketsCommandInput,
                    Output: ListBucketsCommandOutput
                }
            }
        },
        Bucket: {
            Get: {
                Encryption: {
                    Input: GetBucketEncryptionCommandInput,
                    Output: GetBucketEncryptionCommandOutput
                },
                Lifecycle: {
                    Input: GetBucketLifecycleConfigurationCommandInput,
                    Output: GetBucketLifecycleConfigurationCommandOutput
                },
                ACL: {
                    Input: GetBucketAclCommandInput,
                    Output: GetBucketAclCommandOutput
                },
                Versioning: {
                    Input: GetBucketVersioningCommandInput,
                    Output: GetBucketVersioningCommandOutput
                },
                Tagging: {
                    Input: GetBucketTaggingCommandInput,
                    Output: GetBucketTaggingCommandOutput
                },
            }
        },
        Objects: {
            Get: {
                Object: {
                    Input: GetObjectCommandInput,
                    Output: GetObjectCommandOutput
                }
            },
            List: {
                Objects: {
                    Legacy: {
                        Input: ListObjectsCommandInput,
                        Output: ListObjectsCommandOutput
                    },
                    V2: {
                        Input: ListObjectsV2CommandInput,
                        Output: ListObjectsV2CommandOutput
                    }
                }
            }
        }
    };
}

export default AWS;