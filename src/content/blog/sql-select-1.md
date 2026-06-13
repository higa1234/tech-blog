---
title: "PostgreSQL SELECT文の基本：カラム取得・別名・式の使い方"
description: "PostgreSQLのSELECT文について、全カラム取得、カラム指定、別名、固定値、計算式、文字列結合、関数の使い方を初心者向けに解説します。"
pubDate: 2026-06-11
updatedDate: 2026-06-11
tags: ["PostgreSQL", "SQL", "SELECT"]
category: "SQL"
officialDocUrl: "https://www.postgresql.org/docs/16/sql-select.html"
---

# PostgreSQL SELECT文の基本：カラム取得・別名・式の使い方

この記事では、PostgreSQLでデータを取得するときに使う `SELECT` 文の基本を解説します。

## 基本形

```sql
SELECT *
FROM テーブル名;
```
### 全カラムを取得する

テーブルのすべてのカラムを取得するには、`*` を使います。

```sql
SELECT *
FROM employees;
```

`*` は「すべてのカラム」を意味します。

テーブルの内容を手早く確認したいときには便利ですが、本番のSQLでは必要なカラムだけを指定する方が安全です。

### 必要なカラムだけ取得する

取得したいカラムが決まっている場合は、カラム名をカンマ区切りで指定します。

```sql
SELECT employee_id, employee_name
FROM employees;
```

このSQLでは、`employees` テーブルから `employee_id` と `employee_name` だけを取得します。

### SELECT * を使うときの注意点

`SELECT *` は簡単に全カラムを取得できるため便利です。

ただし、次のような注意点があります。

- 不要なカラムまで取得してしまう
- テーブルにカラムが追加されると取得結果が変わる
- アプリケーション側で想定外の列が増える可能性がある
- 大きなカラムを含むテーブルでは負荷が増えることがある

そのため、実務では次のように必要なカラムを明示する書き方が基本です。

## カラムに別名を付ける

取得結果の列名を変えたい場合は、`AS` を使います。

```sql
SELECT employee_name AS name
FROM employees;
```

日本語の別名を付けることもできます。

```sql
SELECT employee_name AS "社員名"
FROM employees;
```

日本語、空白、大文字小文字を区別したい名前を使う場合は、ダブルクォートで囲みます。

## 固定値を取得する

PostgreSQLでは、テーブルを指定せずに固定値を取得することもできます。

```sql
SELECT 'PostgreSQL' AS database_name;
```

```sql
SELECT 1 AS number;
```

動作確認や、固定値を結果に含めたい場合に使えます。

## 計算結果を取得する

`SELECT` 句には、カラム名だけでなく計算式も書けます。

```sql
SELECT 10 + 20 AS result;
```

テーブルのカラムを使って計算することもできます。

```sql
SELECT price * quantity AS total_price
FROM order_items;
```

計算結果には `AS` で別名を付けると、結果がわかりやすくなります。

## 文字列を結合する

PostgreSQLでは、文字列の結合に `||` を使います。

```sql
SELECT first_name || last_name AS full_name
FROM employees;
```

間に空白を入れたい場合は、文字列リテラルを挟みます。

```sql
SELECT first_name || ' ' || last_name AS full_name
FROM employees;
```

## 関数の結果を取得する

`SELECT` 句では関数も使えます。

現在日付を取得する例です。

```sql
SELECT current_date AS today;
```

文字数を取得する例です。

```sql
SELECT length(employee_name) AS name_length
FROM employees;
```

関数を使うと、日付、文字列、数値などを加工した結果を取得できます。

## テーブルに別名を付ける

テーブル名には別名を付けることができます。

```sql
SELECT e.employee_id, e.employee_name
FROM employees AS e;
```

この例では、`employees` テーブルに `e` という別名を付けています。

テーブル別名は、特に `JOIN` で複数のテーブルを扱うときによく使います。

## テーブル名.カラム名で指定する

カラム名の前にテーブル名を付けることもできます。

```sql
SELECT employees.employee_id, employees.employee_name
FROM employees;
```

テーブル別名を使う場合は、次のように書けます。

```sql
SELECT e.employee_id, e.employee_name
FROM employees AS e;
```

どのテーブルのカラムなのかを明確にしたいときに使います。

## 次に読む記事

- WHERE句で条件を指定する
- ORDER BYで並び替える
- LIMITで取得件数を絞る
- DISTINCTで重複を除外する
- JOINで複数テーブルを結合する
