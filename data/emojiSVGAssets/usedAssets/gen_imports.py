file = open("/Users/akhilmandala/code/quitting/ts-react-native-app/data/EmojiClusters.txt", 'r')
emoji_json = {}
current_cluster = ""
svg_export_file = open("/Users/akhilmandala/code/quitting/ts-react-native-app/data/emojiSVGAssets/usedAssets/index.txt", 'w')

def create_component(unicode):
    component = 'function EMOJI_' + unicode + "( props ){"
    component += " return ( "
    component += "<SVG_EMOJI_ASSET_" + unicode + " {...props} /> )}\n"
    return component
    

export_statements = []
components = []
for emoji in file:
    if "Cluster" in emoji:
        current_cluster = emoji.strip()
        emoji_json[current_cluster] = {}
        continue
    emoji_data = emoji.split(" ")

    emoji_name = emoji_data[0]
    emoji_icon = emoji_data[1]
    unicode = emoji_data[2].strip()
    unicode = unicode[2:]
    filename = unicode + '.js'

    import_statement = 'import SVG_EMOJI_ASSET_%s from \'../assets/SVG_EMOJI_ASSET_%s\'' %(unicode, filename)
    export_statements.append('EMOJI_%s' %unicode)
    components.append(create_component(unicode))

    print(import_statement)
    svg_export_file.write(import_statement + "\n")

for component in components:
    svg_export_file.write(component + "\n")

svg_export_file.write("export default { \n")
for export in export_statements:
    svg_export_file.write(export + ",\n")
svg_export_file.write("}")