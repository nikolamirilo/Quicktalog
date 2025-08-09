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

if (schema.properties) {
  if (schema.properties.theme) {
    schema.properties.theme.oneOf = themeData
    delete schema.properties.theme.type
  }
  if (schema.properties.layout) {
    schema.properties.layout.oneOf = layoutData
    delete schema.properties.layout.type
  }
  if (schema.properties.services && schema.properties.services.patternProperties) {
    const serviceCategory = schema.properties.services.patternProperties["^.*$"]
    if (serviceCategory && serviceCategory.properties && serviceCategory.properties.layout) {
      serviceCategory.properties.layout.oneOf = layoutData
      delete serviceCategory.properties.layout.type
    }
  }
}

const outputPath = path.join(__dirname, "catalogue.schema.json")
fs.writeFileSync(outputPath, JSON.stringify(schema, null, 2))

console.log("✅ JSON Schema generated at:", outputPath)
