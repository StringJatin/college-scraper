from bs4 import BeautifulSoup
import csv

html = """<table class=... (your full HTML string here) ..."""

soup = BeautifulSoup(html, 'html.parser')
rows = soup.find('table').find_all('tr')[1:]  # Skip header row

data = []
for row in rows:
    cols = row.find_all('td')
    if cols:
        data.append([
            cols[0].text.strip(),  # Institute
            cols[1].text.strip(),  # Academic Program Name
            cols[2].text.strip(),  # Quota
            cols[3].text.strip(),  # Seat Type
            cols[4].text.strip(),  # Gender
            cols[5].text.strip(),  # Opening Rank
            cols[6].text.strip()   # Closing Rank
        ])

with open('output.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(["Institute", "Academic Program Name", "Quota", "Seat Type", "Gender", "Opening Rank", "Closing Rank"])
    writer.writerows(data)

print("CSV file saved as output.csv")
