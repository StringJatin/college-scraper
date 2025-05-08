import express from "express";
import axios from "axios";
import * as cheerio from "cheerio";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Function to scrape details from the "View Details" page
async function scrapeInstituteDetails(url) {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Extract general details
        let details = {
            type: $("#ctl00_ContentPlaceHolder1_lblTypeOfInstitute").text().trim(),
            address: $("#ctl00_ContentPlaceHolder1_lblCompleteMailingAddr").text().trim(),
            contact_person: $("#ctl00_ContentPlaceHolder1_lblContactPerson").text().trim(),
            designation: $("#ctl00_ContentPlaceHolder1_lblDesignation").text().trim(),
            email: $("#ctl00_ContentPlaceHolder1_lblEmail").text().trim(),
            alternate_email: $("#ctl00_ContentPlaceHolder1_lblAlternateEmail").text().trim(),
            phone: $("#ctl00_ContentPlaceHolder1_lblPhoneNo").text().trim(),
            fax: $("#ctl00_ContentPlaceHolder1_lblFaxNo").text().trim(),
            mobile: $("#ctl00_ContentPlaceHolder1_lblMobileNo").text().trim(),
            about: ""
        };

        // Scrape the "About the Institute" section
        const aboutSection = $("#ctl00_ContentPlaceHolder1_pnlAboutInstitute");
        if (aboutSection.length) {
            let aboutText = "";
            let aboutHtml = "";

            aboutSection.find("p, span").each((_, elem) => {
                aboutText += $(elem).text().trim() + "\n";
            });

            aboutSection.find("table").each((_, table) => {
                aboutHtml += $.html(table); // Store table as raw HTML
            });

            details.about = { text: aboutText.trim(), tableHtml: aboutHtml };
        }

        return details;
    } catch (error) {
        console.error("Error fetching institute details:", error);
        return null;
    }
}

// Function to scrape the main institute list and get detailed info
async function scrapeInstitutes(url) {
    try {
        const baseUrl = "https://josaa.admissions.nic.in/applicant/seatmatrix/";
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        const table = $('#ctl00_ContentPlaceHolder1_gvInstTypelist');
        if (!table.length) {
            console.log("Table not found");
            return [];
        }

        let institutes = [];

        for (let element of table.find('tr').slice(1)) {
            const cols = $(element).find('td');
            if (cols.length < 7) continue;

            let viewLink = $(cols[0]).find('a').attr('href') || '';
            let fullViewLink = viewLink ? baseUrl + viewLink : '';

            if (!fullViewLink) continue;

            let details = await scrapeInstituteDetails(fullViewLink);

            if (details) {
                institutes.push({
                    view_link: fullViewLink,
                    details,
                });
            }
        }

        return institutes;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
}


// API Route to get scraped data
app.get("/api/institutes", async (req, res) => {
    const url = "https://josaa.admissions.nic.in/applicant/seatmatrix/instituteview.aspx";
    const data = await scrapeInstitutes(url);
    res.json(data);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
