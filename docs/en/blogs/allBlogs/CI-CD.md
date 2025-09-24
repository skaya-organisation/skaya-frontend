---
title: CI-CD
date: "2025-09-11"
layout: home
sidebar: false
description: "Deploy your SkayaJS project to AWS EC2 with GitHub Actions CI/CD."

hero:
    name: CI/CD with EC2
    tagline: Learn how to set up AWS EC2 and GitHub Actions for automatic deployments of your SkayaJS projects.
author: "Shubham Kunwar"
tags: ["CI/CD", "AWS", "EC2", "GitHub Actions", "Deployment"]
---

<video width="100%" height="420" controls >
  <source src="/blogs/videos/whatIsSkaya.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## 🚀 Deploying Your App to EC2 with CI/CD

Let’s set up a **real-world CI/CD pipeline**:  
Every time you push to `main`, GitHub Actions will automatically deploy your project to an **AWS EC2 instance**.

---

### 1️⃣ Launch an EC2 Instance (from AWS Console)

1. Open **AWS Console** → EC2 → **Launch Instance**.  
2. Choose **Ubuntu** (recommended).  
3. Select **t2.medium**   
4. Create / select a **key pair (.pem)** file. 
5. Configure **security group** (allow inbound traffic):  
   - SSH (22)  
   - HTTP (80), HTTPS (443)  
6. Connect to EC2:  

``` 
ssh -i "your-key.pem" ubuntu@<EC2_PUBLIC_IP> 
```

---

### 2️⃣ Setup Environment on EC2

Update packages:  
``` 
sudo apt update -y && sudo apt install git curl -y 
```

Install Node.js (v20):  
``` 
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - 
```  

Install **PM2** to keep your app running:  
``` 
sudo npm install -g pm2 
```

### 3️⃣ Add GitHub Actions Workflow

Inside your project, create **`.github/workflows/deploy.yml`**:

```yaml
name: Deploy to EC2

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup SSH
        uses: webfactory/ssh-agent@v0.9.0
        with:
          ssh-private-key: ${{ secrets.EC2_SSH_KEY }}

      - name: Deploy to EC2
        run: |
          ssh -o StrictHostKeyChecking=no ubuntu@${{ secrets.EC2_HOST }} << 'EOF'
            cd /home/ubuntu/app || git clone git@github.com:yourusername/yourrepo.git app && cd app
            git pull origin main
            npm install --production
            pm2 restart all || pm2 start npm -- start
          EOF
```

---

### 4️⃣ Setup GitHub Secrets

Go to your repo → **Settings → Secrets and variables → Actions**:  

- ```EC2_HOST``` → ```<your-ec2-public-ip>```  
- ```EC2_SSH_KEY``` → paste your private ```.pem``` key  
- (Optional) ```EC2_USER``` if not ```ubuntu```  

---

### 5️⃣ First-Time Run on EC2

If you haven’t yet started the app:  

``` 
cd /home/ubuntu/app
npm install
pm2 start npm -- start
```

---

✅ Done! Now every time you push to **main**:  
- GitHub Actions will SSH into EC2  
- Pull your latest code  
- Install dependencies  
- Restart your app with PM2  

---

## 🌟 Conclusion
With **CI/CD + EC2**, your project is always up-to-date.  
You focus on building, while GitHub Actions handles **automatic deployments**.

---

