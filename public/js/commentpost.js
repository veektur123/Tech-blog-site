const commentPostButton = document.querySelector("#submit-comment-button")
const commentPostId = document.querySelector('#comment-post-id')

const createCommentHandler = async (event) => {
    event.preventDefault();
  
    const body = document.querySelector('#comment-body').value.trim();
  
    if (body) {
      const response = await fetch('/api/comments/', {
        method: 'POST',
        body: JSON.stringify({ post_id: commentPostId.innerHTML, body }),
        headers: { 'Content-Type': 'application/json' },
      });
      if(response.ok){
        console.log('comment posted')
      }
    }
  };

  commentPostButton.addEventListener('click', createCommentHandler)