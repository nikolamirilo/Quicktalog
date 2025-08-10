const fs = require("fs")
const path = require("path")
const { createGenerator } = require("ts-json-schema-generator")

const config = {
  path: path.resolve(__dirname, "./types/index.ts"),
  tsconfig: path.resolve(__dirname, "../tsconfig.json"),
  type: "ServiceCatalogue",
  jsDoc: "extended",
}

const schema = createGenerator(config).createSchema(config.type)
const { layouts, themes } = require("../constants/form.js")

const layoutData = layouts.map((l) => ({
  const: l.key,
  description: l.description,
}))

const themeData = themes.map((t) => ({
  const: t.key,
  description: t.description,
}))

// Inject oneOf with descriptions into definitions
if (schema.definitions) {
  if (schema.definitions.ThemeVariant) {
    schema.definitions.ThemeVariant.oneOf = themeData
    delete schema.definitions.ThemeVariant.enum
    delete schema.definitions.ThemeVariant.type
  }
  if (schema.definitions.LayoutVariant) {
    schema.definitions.LayoutVariant.oneOf = layoutData
    delete schema.definitions.LayoutVariant.enum
    delete schema.definitions.LayoutVariant.type
  }
}

// Inject oneOf with descriptions into referenced properties
if (schema.definitions && schema.definitions.ServiceCatalogue) {
  const props = schema.definitions.ServiceCatalogue.properties
  if (props.theme) {
    props.theme.oneOf = themeData
    delete props.theme.$ref
    delete props.theme.type
  }
}

if (schema.definitions && schema.definitions.ServicesCategory) {
  const props = schema.definitions.ServicesCategory.properties
  if (props.layout) {
    props.layout.oneOf = layoutData
    delete props.layout.$ref
    delete props.layout.type
  }
}

// Write the updated schema
const outputPath = path.join(__dirname, "catalogue.schema.json")
fs.writeFileSync(outputPath, JSON.stringify(schema, null, 2))

console.log("✅ JSON Schema generated at:", outputPath)
