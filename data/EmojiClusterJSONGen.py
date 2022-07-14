import json

file = open("/Users/akhilmandala/code/quitting/ts-react-native-app/data/EmojiClusters.txt", 'r')
emoji_json = {}
current_cluster = ""

for emoji in file:
    if "Cluster" in emoji:
        current_cluster = emoji.strip()
        emoji_json[current_cluster] = {}
        continue
    emoji_data = emoji.split(" ")

    emoji_name = emoji_data[0]
    emoji_icon = emoji_data[1]
    unicode = emoji_data[2].strip()

    emoji_json[current_cluster][emoji_name] = {
        "name": emoji_name,
        "emoji": emoji_icon,
        "unicode": unicode[2:]
    }

with open('/Users/akhilmandala/code/quitting/ts-react-native-app/data/emoji_cluster.json', 'w', encoding='utf-8') as f:
    json.dump(emoji_json, f, ensure_ascii=False, indent=4)