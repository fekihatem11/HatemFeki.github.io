.PHONY: run deploy

# Default commit message if not provided (usage: make deploy msg="Your message")
msg ?= "Update portfolio"

# Run the site locally
run:
	hugo server

# Deploy changes to GitHub (triggers GitHub Actions build)
deploy:
	git add .
	git commit -m $(msg)
	git push origin main
