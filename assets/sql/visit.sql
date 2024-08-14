-- Insert URL and date if not exists
INSERT OR IGNORE INTO urls (url) VALUES ($path);
INSERT OR IGNORE INTO dates (date) VALUES (DATE('now'));

WITH
    url_id AS (SELECT id FROM urls WHERE url = $path),
    date_id AS (SELECT id FROM dates WHERE date = DATE('now'))

-- Insert or update visit count
INSERT INTO visits (url_id, date_id, count)
SELECT 
    (SELECT id FROM urls WHERE url = $path),
    (SELECT id FROM dates WHERE date = DATE('now')),
    1
ON CONFLICT(url_id, date_id) 
DO UPDATE SET count = count + 1;
