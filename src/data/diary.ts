const diaryCache = new Map<string, Promise<string>>()

async function loadDiary(url: string) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Не удалось загрузить дневник: ${response.status}`)
  }

  return response.text()
}

export function preloadDiary(url: string) {
  if (!diaryCache.has(url)) {
    diaryCache.set(url, loadDiary(url))
  }

  return diaryCache.get(url)!
}

export function readDiary(url: string) {
  return preloadDiary(url)
}
