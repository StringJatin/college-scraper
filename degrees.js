const { JSDOM } = require("jsdom");
const fs = require("fs");


function htmlToCSV(htmlString, filename = "output.csv") {
    // Parse the HTML using JSDOM
    const dom = new JSDOM(htmlString);
    const document = dom.window.document;

    // Find the table
    const table = document.querySelector("table");
    if (!table) {
        console.error("No table found in the provided HTML.");
        return;
    }

    let csvContent = "";

    // Iterate through rows
    table.querySelectorAll("tr").forEach((row, rowIndex) => {
        let rowData = [];

        // Iterate through each cell (th or td)
        row.querySelectorAll("th, td").forEach((cell) => {
            let text = cell.textContent.trim();
            // Ensure proper CSV formatting (handle commas by wrapping in double quotes)
            text = text.includes(",") ? `"${text}"` : text;
            rowData.push(text);
        });

        // Join row data with commas and add a new line
        csvContent += rowData.join(",") + "\n";
    });

    // Write CSV data to a file
    fs.writeFileSync(filename, csvContent);
    console.log(`CSV file saved as ${filename}`);
}

// Example usage:
const htmlData = `
<table class="table table-bordered table-sm w-100 fs-7" cellspacing="0" rules="all" border="1" id="ctl00_ContentPlaceHolder1_GridView1" style="border-collapse:collapse;">
			<tbody><tr class="bg-secondary text-white">
				<th scope="col" style="width:25%;white-space:nowrap;">Institute</th><th scope="col" style="width:35%;">Academic Program Name</th><th scope="col" style="width:5%;">Quota</th><th scope="col" style="width:10%;">Seat Type</th><th scope="col" style="width:15%;">Gender</th><th scope="col" style="width:5%;">Opening Rank</th><th scope="col" style="width:5%;">Closing Rank</th>
			</tr><tr>
				<td align="left">Indian Institute  of Technology Bombay</td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl02_lblBranch">Computer Science and Engineering (4 Years, Bachelor of Technology)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl02_lblQuota">AI</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl02_lblCategory">OPEN</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl02_lblGender">Gender-Neutral</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl02_lblOpenRank">1</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl02_lblCloseRank">68</span>
                                </td>
			</tr><tr>
				<td align="left">Indian Institute  of Technology Bombay</td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl03_lblBranch">Computer Science and Engineering (4 Years, Bachelor of Technology)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl03_lblQuota">AI</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl03_lblCategory">OPEN</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl03_lblGender">Female-only (including Supernumerary)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl03_lblOpenRank">7</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl03_lblCloseRank">421</span>
                                </td>
			</tr><tr>
				<td align="left">Indian Institute  of Technology Bombay</td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl04_lblBranch">Computer Science and Engineering (4 Years, Bachelor of Technology)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl04_lblQuota">AI</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl04_lblCategory">OPEN (PwD)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl04_lblGender">Gender-Neutral</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl04_lblOpenRank">1</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl04_lblCloseRank">3</span>
                                </td>
			</tr><tr>
				<td align="left">Indian Institute  of Technology Bombay</td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl05_lblBranch">Computer Science and Engineering (4 Years, Bachelor of Technology)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl05_lblQuota">AI</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl05_lblCategory">OPEN (PwD)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl05_lblGender">Female-only (including Supernumerary)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl05_lblOpenRank">7</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl05_lblCloseRank">7</span>
                                </td>
			</tr><tr>
				<td align="left">Indian Institute  of Technology Bombay</td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl06_lblBranch">Computer Science and Engineering (4 Years, Bachelor of Technology)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl06_lblQuota">AI</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl06_lblCategory">EWS</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl06_lblGender">Gender-Neutral</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl06_lblOpenRank">7</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl06_lblCloseRank">23</span>
                                </td>
			</tr><tr>
				<td align="left">Indian Institute  of Technology Bombay</td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl07_lblBranch">Computer Science and Engineering (4 Years, Bachelor of Technology)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl07_lblQuota">AI</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl07_lblCategory">EWS</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl07_lblGender">Female-only (including Supernumerary)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl07_lblOpenRank">43</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl07_lblCloseRank">79</span>
                                </td>
			</tr><tr>
				<td align="left">Indian Institute  of Technology Bombay</td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl08_lblBranch">Computer Science and Engineering (4 Years, Bachelor of Technology)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl08_lblQuota">AI</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl08_lblCategory">EWS (PwD)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl08_lblGender">Gender-Neutral</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl08_lblOpenRank">3</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl08_lblCloseRank">3</span>
                                </td>
			</tr><tr>
				<td align="left">Indian Institute  of Technology Bombay</td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl09_lblBranch">Computer Science and Engineering (4 Years, Bachelor of Technology)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl09_lblQuota">AI</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl09_lblCategory">OBC-NCL</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl09_lblGender">Gender-Neutral</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl09_lblOpenRank">5</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl09_lblCloseRank">50</span>
                                </td>
			</tr><tr>
				<td align="left">Indian Institute  of Technology Bombay</td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl10_lblBranch">Computer Science and Engineering (4 Years, Bachelor of Technology)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl10_lblQuota">AI</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl10_lblCategory">OBC-NCL</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl10_lblGender">Female-only (including Supernumerary)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl10_lblOpenRank">66</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl10_lblCloseRank">274</span>
                                </td>
			</tr><tr>
				<td align="left">Indian Institute  of Technology Bombay</td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl11_lblBranch">Computer Science and Engineering (4 Years, Bachelor of Technology)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl11_lblQuota">AI</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl11_lblCategory">OBC-NCL (PwD)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl11_lblGender">Gender-Neutral</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl11_lblOpenRank">1</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl11_lblCloseRank">2</span>
                                </td>
			</tr><tr>
				<td align="left">Indian Institute  of Technology Bombay</td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl12_lblBranch">Computer Science and Engineering (4 Years, Bachelor of Technology)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl12_lblQuota">AI</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl12_lblCategory">OBC-NCL (PwD)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl12_lblGender">Female-only (including Supernumerary)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl12_lblOpenRank">20</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl12_lblCloseRank">20</span>
                                </td>
			</tr><tr>
				<td align="left">Indian Institute  of Technology Bombay</td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl13_lblBranch">Computer Science and Engineering (4 Years, Bachelor of Technology)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl13_lblQuota">AI</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl13_lblCategory">SC</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl13_lblGender">Gender-Neutral</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl13_lblOpenRank">1</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl13_lblCloseRank">31</span>
                                </td>
			</tr><tr>
				<td align="left">Indian Institute  of Technology Bombay</td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl14_lblBranch">Computer Science and Engineering (4 Years, Bachelor of Technology)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl14_lblQuota">AI</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl14_lblCategory">SC</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl14_lblGender">Female-only (including Supernumerary)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl14_lblOpenRank">10</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl14_lblCloseRank">71</span>
                                </td>
			</tr><tr>
				<td align="left">Indian Institute  of Technology Bombay</td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl15_lblBranch">Computer Science and Engineering (4 Years, Bachelor of Technology)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl15_lblQuota">AI</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl15_lblCategory">SC (PwD)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl15_lblGender">Gender-Neutral</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl15_lblOpenRank">1</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl15_lblCloseRank">1</span>
                                </td>
			</tr><tr>
				<td align="left">Indian Institute  of Technology Bombay</td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl16_lblBranch">Computer Science and Engineering (4 Years, Bachelor of Technology)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl16_lblQuota">AI</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl16_lblCategory">ST</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl16_lblGender">Gender-Neutral</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl16_lblOpenRank">1</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl16_lblCloseRank">13</span>
                                </td>
			</tr><tr>
				<td align="left">Indian Institute  of Technology Bombay</td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl17_lblBranch">Computer Science and Engineering (4 Years, Bachelor of Technology)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl17_lblQuota">AI</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl17_lblCategory">ST</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl17_lblGender">Female-only (including Supernumerary)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl17_lblOpenRank">16</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl17_lblCloseRank">40</span>
                                </td>
			</tr><tr>
				<td align="left">Indian Institute  of Technology Bombay</td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl18_lblBranch">Computer Science and Engineering (4 Years, Bachelor of Technology)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl18_lblQuota">AI</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl18_lblCategory">ST (PwD)</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl18_lblGender">Gender-Neutral</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl18_lblOpenRank">1</span>
                                </td><td align="left">
                                    <span id="ctl00_ContentPlaceHolder1_GridView1_ctl18_lblCloseRank">1</span>
                                </td>
			</tr>
		</tbody></table>
`;

htmlToCSV(htmlData, "jee_ranks.csv");
