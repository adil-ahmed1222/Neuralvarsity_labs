from collections import deque
from PIL import Image

SRC = r"C:\Users\Adil Ahmed\OneDrive\Desktop\Labs_Neuralvarsity\public\brand\neuralvarsity-logo.png"
DST = r"C:\Users\Adil Ahmed\OneDrive\Desktop\Labs_Neuralvarsity\app\icon.png"

# A pixel counts as removable background only if it is near-black.
# Bright outlines inside the artwork block the flood fill, so the dark
# navy interior of the logo is preserved.
THRESHOLD = 60

img = Image.open(SRC).convert("RGBA")
w, h = img.size
px = img.load()


def is_bg(x, y):
    r, g, b, a = px[x, y]
    # Already-transparent pixels also count so the fill can pass through
    # regions that were cleared previously.
    if a == 0:
        return True
    return max(r, g, b) <= THRESHOLD


visited = bytearray(w * h)
q = deque()

for x in range(w):
    for y in (0, h - 1):
        if not visited[y * w + x] and is_bg(x, y):
            visited[y * w + x] = 1
            q.append((x, y))
for y in range(h):
    for x in (0, w - 1):
        if not visited[y * w + x] and is_bg(x, y):
            visited[y * w + x] = 1
            q.append((x, y))

while q:
    x, y = q.popleft()
    for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        nx, ny = x + dx, y + dy
        if 0 <= nx < w and 0 <= ny < h:
            idx = ny * w + nx
            if not visited[idx] and is_bg(nx, ny):
                visited[idx] = 1
                q.append((nx, ny))

cleared = 0
for y in range(h):
    row = y * w
    for x in range(w):
        if visited[row + x]:
            r, g, b, a = px[x, y]
            if a != 0:
                px[x, y] = (r, g, b, 0)
                cleared += 1

img.save(DST)
print(f"Cleared {cleared} background pixels of {w * h}. Saved -> {DST}")
