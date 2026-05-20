const shortenBtn = document.getElementById('shortenBtn');
const urlInput = document.getElementById('urlInput');
const result = document.getElementById('result');
const shortUrl = document.getElementById('shortUrl');
const copyBtn = document.getElementById('copyBtn');

shortenBtn.addEventListener('click', async () => {
  const url = urlInput.value.trim();

  if (!url) {
    alert('Please enter a URL');
    return;
  }

  try {
    const response = await fetch('/api/shorten', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });

    const data = await response.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    result.classList.remove('hidden');

    shortUrl.value = data.shortUrl;
  } catch (error) {
    alert('Something went wrong');
  }
});

copyBtn.addEventListener('click', async () => {
  await navigator.clipboard.writeText(shortUrl.value);

  copyBtn.innerText = 'Copied!';

  setTimeout(() => {
    copyBtn.innerText = 'Copy';
  }, 2000);
});