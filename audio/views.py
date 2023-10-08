import os
import re
from collections import defaultdict
from rest_framework.views import APIView
from wsgiref.util import FileWrapper
from django.http import StreamingHttpResponse, JsonResponse, HttpResponse
from ytmusicapi import YTMusic


# INITIALISING
ytmusic = YTMusic()
RANGE_RE = re.compile(r"bytes\s*=\s*(\d+)\s*-\s*(\d*)", re.I)

def file_iterator(file_path, chunk_size=8192, offset=0, length=None):
    with open(file_path, "rb") as f:
        f.seek(offset, os.SEEK_SET)
        remaining = length
        while True:
            bytes_length = (
                chunk_size
                if remaining is None 
                else min(remaining, chunk_size)
            )
            data = f.read(bytes_length)
            if not data:
                break
            if remaining:
                remaining -= len(data)
            yield data


class StreamView(APIView):

    def get(self, request, format=None):
        path = request.GET.get('title')
        content_type = "audio/mp3"

        range_header = request.META.get("HTTP_RANGE", "").strip()
        range_match = RANGE_RE.match(range_header)
        size = os.path.getsize(path)

        if range_match:
            first_byte, last_byte = range_match.groups()
            first_byte = int(first_byte) if first_byte else 0
            last_byte = (
                first_byte + 1024 * 64
            )
            if last_byte >= size:
                last_byte = size - 1
            length = last_byte - first_byte + 1
            response = StreamingHttpResponse(
                file_iterator(path, offset=first_byte, length=length),
                status=206,
                content_type=content_type,
            )
            response["Content-Range"] = f"bytes {first_byte}-{last_byte}/{size}"

        else:
            response = StreamingHttpResponse(
                FileWrapper(open(path, "rb")), content_type=content_type
            )
        response["Accept-Ranges"] = "bytes"
        return response
    

class SearchView(APIView):

    def get(self, request, format=None):
        query_results = ytmusic.search(request.GET.get('q'))
        filtered_results = defaultdict(list)
        import json
        with open('./sample_new_jeans.json', 'w') as f:
            json.dump(query_results, f, indent=2)
        for result in query_results:
            if result['category'] == 'Top result':
                continue
            elif result['resultType'] == 'artist':
                filtered_results['artists'].append({
                    'artist': result['artist'],
                    'browseId': result['browseId'],
                    'thumbnail': result['thumbnails'][1],
                })
            elif result['resultType'] == 'album':
                filtered_results['albums'].append({
                    'title': result['title'],
                    'browseId': result['browseId'],
                    'thumbnail': result['thumbnails'][1],
                    'year': result['year'],
                    'artists': result['artists'], #list
                })
            elif result['resultType'] == 'song':
                filtered_results['songs'].append({
                    'title': result['title'],
                    'album': result['album'],
                    'videoId': result['videoId'],
                    'duration': result['duration'],
                    'thumbnail': result['thumbnails'][1],
                    'artists': result['artists'], #list
                })
        return JsonResponse(filtered_results)