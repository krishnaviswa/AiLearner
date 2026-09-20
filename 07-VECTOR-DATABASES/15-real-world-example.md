---
concept_id: vector-db.complex
title: Vector search — Complex (vendor maps)
domain_folder: 07-VECTOR-DATABASES
levels_covered: [6, 7]
knowledge_class: mixed
tech_status: vendor-specific
last_verified: 2026-09-20
primary_source: SRC-AZURE-VECTOR-SEARCH-OVERVIEW
status: verified
related_nodes: [vector-db, rag, identity]
---

# Vector search (Complex) — official products, same pipeline

Same topic as [Filter then rank](02-simple.md) and [Medium — ingestion logic](03-logical.md). These are **documented vendor products**, not unofficial internal-architecture stories. Prices, SKU lists, and dimension limits are **volatile** — read the vendor page before you build.

## Vendor map (fetched 2026-09-20)

| Vendor | Official object | What the docs actually say | Source |
|---|---|---|---|
| **Microsoft** | Azure AI Search vector fields + indexers | kNN vector fields live alongside text fields in one index. Two ingestion paths: push prevectorized content, or let an indexer do **integrated data chunking + vectorization**. Indexers pull from Blob Storage, Cosmos DB for NoSQL, ADLS Gen2, Table Storage, and OneLake. Underpins Foundry IQ. | `SRC-AZURE-VECTOR-SEARCH-OVERVIEW`, `SRC-AZURE-AI-SEARCH-SKU` |
| **Amazon** | OpenSearch Service k-NN + S3 Vectors + Bedrock Knowledge Bases | k-NN is an open-source plugin (Apache-2.0 OpenSearch) exposed as a managed service; index with `index.knn` + a `knn_vector` field. **S3 Vectors** stores/queries vectors natively inside S3 buckets, positioned as the cold/cheap tier behind OpenSearch for hot queries. **Bedrock Knowledge Bases** is the managed ingestion pipeline: it chunks source data and writes chunks + vectors + metadata into whichever store is chosen — OpenSearch Serverless/Managed, S3 Vectors, Aurora (pgvector, HNSW index), Neptune Analytics, or third-party Pinecone / MongoDB Atlas / Redis Enterprise Cloud. | `SRC-AWS-OPENSEARCH-KNN`, `SRC-AWS-S3-VECTORS`, `SRC-AWS-BEDROCK-KB-SETUP` |
| **Google** | Vertex AI Vector Search | Built on Google's ScaNN algorithm. Supports batch index rebuilds and **streaming ingestion** for near-real-time updates; can import embeddings straight from BigQuery. | `SRC-GCP-VERTEX-VECTOR-SEARCH` |
| **Databricks** | Vector Search (Delta Sync Index) | Reads a Unity Catalog Delta table (or streaming table / Iceberg v3+); standard endpoints require Change Data Feed on the source. Managed embeddings (computed automatically) or self-managed (caller supplies vectors) — **not interconvertible**. **Continuous sync** (near-real-time) or **triggered sync** (manual REST call) depending on endpoint type. | `SRC-DATABRICKS-VECTOR-SEARCH`, `SRC-DATABRICKS-AI-SEARCH` |
| **Snowflake** | Cortex Search | Indexes a base table defined by a source query directly in the warehouse; hosted embedding models (Arctic Embed family) build a hybrid vector + keyword + rerank index. Freshness controlled by `TARGET_LAG`, the same mechanism as Dynamic Tables; incremental refresh when a primary key is defined. | `SRC-SNOWFLAKE-CORTEX-SEARCH` |
| **Open source / DIY** | pgvector on Postgres; Milvus | pgvector: HNSW (no training phase, better recall/speed, higher build cost) and IVFFlat (needs data present before build, cheaper, lower recall) index types; L2 / inner-product / cosine / L1 / Hamming / Jaccard distances; bulk load via `COPY`; full ACID + JOINs since it's Postgres. Milvus: open source (Apache-2.0), three deployment shapes (Lite / Standalone / Distributed-on-Kubernetes) with compute and storage separated into query/data/index node roles; Milvus CDC replicates between Milvus clusters for DR, and Vector Transmission Service (VTS) moves data between Milvus and external systems like Postgres or Elasticsearch. | `SRC-PGVECTOR-README`, `SRC-MILVUS-OVERVIEW` |

Every row is the **same durable pipeline** from [Medium](03-logical.md) — source → change signal → chunk → embed → upsert → index → filter → rank — behind a different product name and a different freshness contract.

## Where "SQL warehouse / database / S3" actually plugs in

| Your data lives in… | Closest official on-ramp |
|---|---|
| Postgres / MySQL (OLTP) | Add pgvector in-place (no separate index) **or** log-based CDC (`SRC-DEBEZIUM-FAQ`) into a managed store; Bedrock KB's Aurora option is the managed version of the former |
| Snowflake / Databricks SQL warehouse | Cortex Search or Delta Sync Index — both read the warehouse table directly, no separate ETL hop |
| S3 / Blob / ADLS | Azure indexers, a Bedrock KB S3 data source, or S3 Vectors querying the bucket in place |
| BigQuery | Vertex AI Vector Search batch import or streaming ingestion |

If your system of record is already one of these, the fastest path is the vendor's **native** sync (Delta Sync Index, Cortex Search, an indexer, a KB data source) before reaching for a standalone vector DB plus hand-rolled CDC.

## What we are not claiming

- Internal query-time ANN algorithm internals beyond what each vendor names (ScaNN, HNSW/IVFFlat, the faiss engine inside OpenSearch's k-NN plugin).
- Dollar costs, vector-count ceilings, or dimension limits as stable numbers — AWS's own "up to 90% cheaper" S3 Vectors claim is a marketing figure, not a benchmark (`SRC-AWS-S3-VECTORS`).
- That any of these managed syncs implement row-level ACL for you. Filtering by tenant/permission is still **your** metadata design — see [Filter then rank](02-simple.md) and OWASP LLM09 (`SRC-OWASP-LLM-TOP10-2026-GH`).

## Architect challenge

Pick your actual system of record — a Postgres OLTP table, a Snowflake/Databricks warehouse table, or an S3 bucket of documents. Name the vendor's **native** sync mechanism for that source (not a generic "call an API in a loop"), and say what happens to the index if that sync job is paused for an hour. If you can't answer with the specific object (Delta Sync Index, Cortex Search, an indexer, a KB data source), you don't yet have a real ingestion pipeline — you have a script.

## What should I learn next?

[Medium — ingestion logic](03-logical.md) · [When not](19-comparison.md) · [Sources catalog](../00-MASTER-MAP/sources-and-reading.md)
