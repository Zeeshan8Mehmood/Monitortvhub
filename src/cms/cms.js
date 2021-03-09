import CMS from "netlify-cms-app";
import { UuidControl, UuidPreview } from "netlify-cms-widget-uuid-v4";
import { MdxControl, MdxPreview } from "netlify-cms-widget-mdx";

const config = {
  backend: {
    name: "git-gateway",
    branch: process.env.MY_BRANCH,
    commit_messages: {
      create: "Create {{collection}} “{{slug}}”",
      update: "Update {{collection}} “{{slug}}”",
      delete: "Delete {{collection}} “{{slug}}”",
      uploadMedia: "[skip ci] Upload “{{path}}”",
      deleteMedia: "[skip ci] Delete “{{path}}”",
    },
  },

  load_config_file: false,
  local_backend: true,
  publish_mode: process.env.EDITORIAL_WORKFLOW ? "editorial_workflow" : "simple",

  media_folder: "static/img",
  public_folder: "/img",

  collections: [
    {
      name: "site-data",
      label: "Site Information",
      editor: {
        preview: false,
      },
      files: [
        {
          name: "site",
          label: "Site Information",
          file: "src/pages/site-data.md",
          fields: [
            {
              label: "Template Key",
              name: "templateKey",
              widget: "hidden",
              default: "site-data",
            },
            { label: "Site Name", name: "title", widget: "string" },
            { label: "Logo small", name: "logoSmall", widget: "image" },
            { label: "Logo Large", name: "logoLarge", widget: "image" },
            { label: "Favicon 16x16", name: "faviconSmall", widget: "image" },
            { label: "Favicon 32x32", name: "faviconLarge", widget: "image" },
            {
              label: "Disqus Shortname",
              name: "disqus",
              widget: "string",
              required: false,
            },
            {
              label: "Facebook",
              name: "facebook",
              widget: "string",
              required: false,
            },
            {
              label: "Youtube",
              name: "youtube",
              widget: "string",
              required: false,
            },
            {
              label: "Twitter",
              name: "twitter",
              widget: "string",
              required: false,
            },
            {
              label: "Number",
              name: "number",
              widget: "string",
              required: false,
            },
            { label: "DMCA Enable", name: "dmca", widget: "boolean" },
            { label: "DMCA Link", name: "dmcaLink", widget: "string" },
            {
              label: "Include Category in Link",
              name: "linkType",
              widget: "boolean",
              required: false,
            },
            {
              label: "Cookies Consent",
              name: "cookies",
              widget: "object",
              fields: [
                {
                  label: "Enable Cookies Consent",
                  name: "enabled",
                  widget: "boolean",
                },
                {
                  label: "Cookies Consent Message",
                  name: "message",
                  widget: "string",
                  required: true,
                },
              ],
            },
            {
              label: "Site Color Schemes",
              name: "colors",
              widget: "object",
              fields: [
                {
                  label: "Site Background",
                  name: "background",
                  widget: "string",
                },
                {
                  label: "Text Blocks Background",
                  name: "blockBackground",
                  widget: "string",
                },
                {
                  label: "Table Header Background",
                  name: "headerBackground",
                  widget: "string",
                },
                { label: "Text Color", name: "textColor", widget: "string" },
                {
                  label: "Button Background",
                  name: "btnBackground",
                  widget: "string",
                },
                {
                  label: "Button Hover Background",
                  name: "btnHoverBackground",
                  widget: "string",
                },
                {
                  label: "Button Text Color",
                  name: "btnColor",
                  widget: "string",
                },
                {
                  label: "Navbar Shadow Color",
                  name: "navbarShadow",
                  widget: "string",
                },
                {
                  label: "Header Text Color",
                  name: "headerTextColor",
                  widget: "string",
                },
              ],
            },
            {
              label: "Ads",
              name: "ads",
              widget: "object",
              fields: [
                {
                  label: "Enable Ads",
                  name: "enableAds",
                  widget: "boolean",
                  required: false,
                },
                {
                  label: "Ads disabled on posts",
                  name: "disabledPostsAds",
                  widget: "relation",
                  collection: "blog",
                  value_field: "slug",
                  search_fields: ["title", "slug"],
                  display_fields: ["title"],
                  multiple: true,
                  required: false,
                },
                {
                  label: "Ad Codes",
                  name: "adCodes",
                  widget: "object",
                  fields: [
                    {
                      label: "After table of contents",
                      name: "afterToC",
                      widget: "mdx",
                      required: false,
                    },
                    {
                      label: "After first body title",
                      name: "afterTitle",
                      widget: "mdx",
                      required: false,
                    },
                    {
                      label: "Middle of body",
                      name: "insideBody",
                      widget: "mdx",
                      required: false,
                    },
                    {
                      label: "Sidebar sticky",
                      name: "sidebarSticky",
                      widget: "mdx",
                      required: false,
                    },
                    {
                      label: "Before Author",
                      name: "beforeAuthor",
                      widget: "mdx",
                      required: false,
                    },
                    {
                      label: "Sticky at bottom for Mobile",
                      name: "stickyMobile",
                      widget: "mdx",
                      required: false,
                    },
                  ],
                },
              ],
            },
            {
              label: "Top Navigation",
              name: "topNav",
              widget: "list",
              fields: [
                { label: "Title", name: "title", widget: "string" },
                { label: "Link", name: "link", widget: "string" },
                {
                  label: "Child",
                  name: "child",
                  widget: "list",
                  fields: [
                    { label: "Title", name: "title", widget: "string" },
                    { label: "Link", name: "link", widget: "string" },
                    {
                      label: "Child",
                      name: "child",
                      widget: "list",
                      fields: [
                        {
                          label: "Title",
                          name: "title",
                          widget: "string",
                        },
                        { label: "Link", name: "link", widget: "string" },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              label: "Footer Navigation",
              name: "footerNav",
              widget: "list",
              fields: [
                { label: "Title", name: "title", widget: "string" },
                { label: "Link", name: "link", widget: "string" },
              ],
            },
            {
              label: "Add Pages to NoFollow(add slug of pages)",
              name: "nofollow",
              widget: "list",
              collapsed: false,
              minimum: 0,
              field: { label: "Value", name: "value", widget: "string" },
            },
            {
              label: "Add Pages to NoIndex(add slug of pages)",
              name: "noindex",
              widget: "list",
              collapsed: false,
              minimum: 0,
              field: { label: "Value", name: "value", widget: "string" },
            },
            {
              label: "Add Pages to Remove them from Sitemap(add slug of pages)",
              name: "sitemap",
              widget: "list",
              collapsed: false,
              minimum: 0,
              field: { label: "Value", name: "value", widget: "string" },
            },
          ],
        },
      ],
    },

    {
      name: "pages",
      label: "Pages",
      folder: "src/pages",
      create: true,
      slug: "{{slug}}",
      extension: "md",
      format: "frontmatter",
      filter: { field: "templateKey", value: "default-page" },
      fields: [
        {
          label: "Template Key",
          name: "templateKey",
          widget: "hidden",
          default: "default-page",
        },
        { label: "Title", name: "title", widget: "string" },
        { label: "Slug", name: "slug", widget: "string", required: false },
        {
          label: "SEO Title",
          name: "seoTitle",
          widget: "string",
          pattern: ["^.{0,65}$", "Can;t have more than 65 characters"],
        },
        {
          label: "SEO Description",
          name: "seoDescription",
          widget: "string",
          pattern: ["^.{0,165}$", "Can;t have more than 160 characters"],
        },
        {
          label: "Body",
          name: "body",
          widget: "markdown",
          default: "",
          required: false,
        },
      ],
    },

    {
      name: "other-pages",
      label: "Other Pages",
      files: [
        {
          name: "index",
          label: "Index Page",
          file: "src/pages/index.md",
          fields: [
            {
              label: "Template Key",
              name: "templateKey",
              widget: "hidden",
              default: "index-page",
            },
            {
              label: "Static Page",
              name: "static",
              widget: "boolean",
              required: false,
            },
            {
              label: "SEO Title",
              name: "seoTitle",
              widget: "string",
              pattern: ["^.{0,65}$", "Can;t have more than 65 characters"],
            },
            {
              label: "SEO Description",
              name: "seoDescription",
              widget: "string",
              pattern: ["^.{0,165}$", "Can;t have more than 160 characters"],
            },
            {
              label: "Body",
              name: "body",
              widget: "markdown",
              default: "",
              required: false,
            },
            {
              label: "Home Categories",
              name: "categories",
              widget: "list",
              collapsed: false,
              minimum: 0,
              fields: [
                { label: "Title", name: "title", widget: "string" },
                {
                  label: "Links",
                  name: "links",
                  widget: "list",
                  fields: [
                    { label: "Title", name: "title", widget: "string" },
                    { label: "Link", name: "link", widget: "string" },
                  ],
                },
              ],
            },
          ],
        },
        {
          name: "about",
          label: "About Page",
          file: "src/pages/about-us.md",
          fields: [
            {
              label: "Template Key",
              name: "templateKey",
              widget: "hidden",
              default: "about-page",
            },
            { label: "Title", name: "title", widget: "string" },
            { label: "Slug", name: "slug", widget: "string", required: false },
            {
              label: "SEO Title",
              name: "seoTitle",
              widget: "string",
              pattern: ["^.{0,65}$", "Can;t have more than 65 characters"],
            },
            {
              label: "SEO Description",
              name: "seoDescription",
              widget: "string",
              pattern: ["^.{0,165}$", "Can;t have more than 160 characters"],
            },
            {
              label: "Body",
              name: "body",
              widget: "markdown",
              default: "",
              required: false,
            },
          ],
        },
      ],
    },

    {
      name: "categories",
      label: "Categories",
      folder: "src/pages",
      create: true,
      slug: "{{slug}}",
      extension: "md",
      format: "frontmatter",
      filter: { field: "templateKey", value: "category-page" },
      fields: [
        { label: "ID", name: "id", widget: "uuid" },
        {
          label: "Template Key",
          name: "templateKey",
          widget: "hidden",
          default: "category-page",
        },
        { label: "Category Name", name: "title", widget: "string" },
        { label: "Slug", name: "slug", widget: "string" },
        { label: "Category Description", name: "description", widget: "string" },
        {
          label: "SEO Title",
          name: "seoTitle",
          widget: "string",
          pattern: ["^.{0,65}$", "Can;t have more than 65 characters"],
        },
        {
          label: "SEO Description",
          name: "seoDescription",
          widget: "string",
          pattern: ["^.{0,165}$", "Can;t have more than 160 characters"],
        },
        {
          label: "Parent",
          name: "parent",
          widget: "relation",
          collection: "categories",
          value_field: "id",
          search_fields: ["title"],
          display_fields: ["title"],
          required: false,
        },
      ],
    },

    {
      name: "authors",
      label: "Authors",
      folder: "src/pages",
      create: true,
      slug: "{{slug}}",
      extension: "md",
      format: "frontmatter",
      filter: { field: "templateKey", value: "author-page" },
      fields: [
        { label: "ID", name: "id", widget: "uuid" },
        {
          label: "Template Key",
          name: "templateKey",
          widget: "hidden",
          default: "author-page",
        },
        { label: "Author Name", name: "title", widget: "string" },
        { label: "Slug", name: "slug", widget: "string" },
        { label: "Author Image", name: "image", widget: "image" },
        { label: "Author Description", name: "description", widget: "string" },
        {
          label: "SEO Title",
          name: "seoTitle",
          widget: "string",
          pattern: ["^.{0,65}$", "Can;t have more than 65 characters"],
        },
        {
          label: "SEO Description",
          name: "seoDescription",
          widget: "string",
          pattern: ["^.{0,165}$", "Can;t have more than 160 characters"],
        },
      ],
    },

    {
      name: "blog",
      label: "Blog",
      folder: "src/posts",
      create: true,
      slug: "{{slug}}",
      extension: "mdx",
      format: "frontmatter",
      fields: [
        {
          label: "Template Key",
          name: "templateKey",
          widget: "hidden",
          default: "blog-post",
        },
        { label: "Title", name: "title", widget: "string" },
        { label: "Slug", name: "slug", widget: "string" },
        {
          label: "SEO Title",
          name: "seoTitle",
          widget: "string",
          pattern: ["^.{0,65}$", "Can;t have more than 65 characters"],
        },
        {
          label: "SEO Description",
          name: "seoDescription",
          widget: "string",
          pattern: ["^.{0,165}$", "Can;t have more than 160 characters"],
        },
        { label: "Featured Image", name: "featuredimage", widget: "image" },
        {
          label: "Hide Featured Image on Blog Post",
          name: "hidefeaturedimage",
          widget: "boolean",
          required: false,
        },
        { label: "Publish Date", name: "date", widget: "datetime" },
        { label: "Modified Date", name: "moddate", widget: "datetime" },
        {
          label: "Enable Table of Contents",
          name: "tableofcontent",
          widget: "boolean",
          default: true,
        },
        {
          label: "Author",
          name: "author",
          widget: "relation",
          collection: "authors",
          value_field: "id",
          search_fields: ["id"],
          display_fields: ["title"],
          required: false,
        },
        {
          label: "Category",
          name: "category",
          widget: "relation",
          collection: "categories",
          value_field: "id",
          search_fields: ["id"],
          display_fields: ["title"],
          required: false,
        },
        {
          label: "Enable Rating",
          name: "rating",
          widget: "boolean",
          default: true,
        },
        { label: "Rating Count", name: "rcount", widget: "number", default: 0 },
        {
          label: "Rating Value",
          name: "rvalue",
          widget: "number",
          default: 5,
        },
        {
          label: "Before Body",
          name: "beforebody",
          widget: "mdx",
          default: "",
          required: false,
        },
        {
          label: "Table",
          name: "table",
          widget: "object",
          fields: [
            {
              label: "Enable Products Table",
              name: "table",
              widget: "boolean",
              default: true,
            },
            {
              label: "Products Table Title",
              name: "title",
              widget: "string",
              required: false,
            },
            {
              label: "Products Table Header Title",
              name: "headTitle",
              widget: "string",
              required: false,
            },
            {
              label: "Products Table Seo Title",
              name: "seoTitle",
              widget: "string",
              required: false,
            },
            {
              label: "Extra Table Columns of Products",
              name: "productColumns",
              widget: "relation",
              collection: "blog",
              value_field: "products.*.specs.*.name",
              search_fields: ["products.*.specs.*.name"],
              display_fields: ["products.*.specs.*.name"],
              multiple: true,
              required: false,
            },
          ],
        },
        { label: "Body", name: "body", widget: "mdx", required: false },
        {
          label: "Products",
          name: "products",
          widget: "list",
          collapsed: false,
          minimum: 0,
          fields: [
            { label: "Product Title", name: "name", widget: "string" },
            {
              label: "Product Table Seo Title",
              name: "seoName",
              widget: "string",
              required: false,
            },
            { label: "Product Image", name: "image", widget: "image" },
            { label: "Product Link", name: "link", widget: "string" },
            { label: "Product Body", name: "body", widget: "mdx" },
            {
              label: "Pros",
              name: "pros",
              widget: "list",
              collapsed: false,
              minimum: 0,
              field: { label: "Value", name: "pro", widget: "string" },
            },
            {
              label: "Cons",
              name: "cons",
              widget: "list",
              collapsed: false,
              minimum: 0,
              field: { label: "Value", name: "con", widget: "string" },
            },
            {
              label: "Specification Table",
              name: "specs",
              widget: "list",
              collapsed: false,
              minimum: 0,
              fields: [
                { label: "Parameter", name: "name", widget: "string" },
                { label: "Value", name: "value", widget: "string" },
              ],
            },
            {
              label: "Product Button Text",
              name: "btnText",
              widget: "string",
              default: "View on Amazon",
              required: false,
            },
          ],
        },
        {
          label: "After Body",
          name: "afterbody",
          widget: "mdx",
          default: "",
          required: false,
        },
        {
          label: "Sidebar",
          name: "sidebar",
          widget: "object",
          required: false,
          fields: [
            {
              label: "Table of Contents",
              name: "stoc",
              widget: "list",
              collapsed: false,
              minimum: 0,
              fields: [
                { label: "Name", name: "name", widget: "string" },
                {
                  label: "Child",
                  name: "level",
                  widget: "boolean",
                  default: true,
                },
              ],
            },
            {
              label: "Second Title",
              name: "stitle",
              widget: "string",
              default: "Editor's Choice",
              required: false,
            },
            {
              label: "Sidebar Image",
              name: "image",
              widget: "image",
              required: false,
            },
            {
              label: "Sidebar Link Text",
              name: "atext",
              widget: "string",
              required: false,
            },
            {
              label: "Sidebar Link Href",
              name: "alink",
              widget: "string",
              required: false,
            },
          ],
        },
        {
          label: "Frequently Asked Questions (OPTIONAL)",
          name: "faq",
          collapsed: false,
          minimum: 0,
          widget: "list",
          fields: [
            { label: "Question", name: "ques", widget: "string" },
            { label: "Answer", name: "ans", widget: "text" },
          ],
        },
      ],
    },
  ],
};

CMS.init({ config });

CMS.registerWidget("uuid", UuidControl, UuidPreview);
CMS.registerWidget("mdx", MdxControl, MdxPreview);

/* import AboutPagePreview from "./preview-templates/AboutPagePreview";
import BlogPostPreview from "./preview-templates/BlogPostPreview";
import IndexPagePreview from "./preview-templates/IndexPagePreview";

CMS.registerPreviewTemplate("index", IndexPagePreview);
CMS.registerPreviewTemplate("about", AboutPagePreview);
CMS.registerPreviewTemplate("blog", BlogPostPreview); */
