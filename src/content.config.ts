// Astro の Content Collections を定義するための関数
import { defineCollection } from 'astro:content';
// Markdown ファイルなどをまとめて読み込むための loader
import { glob } from 'astro/loaders';
// frontmatter の型チェックに使う Zod
// Astro v6 系では astro:content から z を import せず、zod から直接 import する
import { z } from 'zod';

/**
 * PostgreSQL技術ブログの記事コレクション
 *
 * src/content/blog/ 配下の .md / .mdx ファイルを
 * ブログ記事として読み込む設定。
 */
const blog = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/blog',
  }),

  /**
   * 各記事のfrontmatterの型定義
   *
   * ここで定義した項目に合わない記事は、
   * ビルド時や開発サーバー起動時にエラーになる。
   */
  schema: z.object({
    /**
     * 記事タイトル
     * 例: "PostgreSQLとは？初心者向けにわかりやすく解説"
     */
    title: z.string(),

    /**
     * 記事の説明文
     * 記事一覧やSEO用のdescriptionとして使います。
     */
    description: z.string(),

    /**
     * 公開日
     * Markdown側では 2026-06-09 のように書けます。
     */
    pubDate: z.coerce.date(),

    /**
     * 更新日
     * 記事を更新した場合だけ書きます。
     * .optional(): 書かなくてもOKです(任意項目)。
     */
    updatedDate: z.coerce.date().optional(),

    /**
     * カテゴリ
     * categories.ts 側で定義するカテゴリIDを入れる想定です。
     *
     * 例:
     * beginner
     * sql
     * performance
     * operation
     * transaction-lock
     * errors
     */
    category: z.string(),

    /**
     * タグ
     * 例: ["SQL", "GROUP BY", "WHERE"]
     *
     * .default(): 書かなかった場合は空配列になります。
     */
    tags: z.array(z.string()).default([]),

    /**
     * 公式ドキュメントへのリンク
     *
     * 記事によっては公式ドキュメントを載せない場合もあるため、
     * optional(): 任意項目にしています。
     */
    officialDocs: z
      .array(
        z.object({
          label: z.string(),
          url: z.url(),
        }),
      )
      .optional(),

    /**
     * 下書きフラグ
     *
     * true の記事は一覧に出さない運用にします。
     * 書かなかった場合は false になります。
     */
    draft: z.boolean().default(false),
  }),
});

// Astro に blog コレクションを登録
// getCollection('blog') のように呼び出せるようになる
export const collections = {
  blog,
};