from ytmusicapi import YTMusic
import json

ytmusic = YTMusic()

search_results = ytmusic.search('rockwell')
with open('./sample_new_jeans.json', 'w') as f:
    json.dump(search_results, f, indent=6)