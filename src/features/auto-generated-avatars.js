import { getAllComments } from "../libs/dom-utils";
import { paths } from "../libs/paths";

function generateAvatarFromUsername(author) {
  const p = 2;
  const img = document.createElement("img");
  img.width = p * 8;
  img.height = p * 8;
  img.classList += "__rhn__avatar";

  img.src = `https://unavatar.io/${author.innerText}`;
  return img;
}

async function init() {
  const op = document.body.querySelector("a.hnuser");
  if (op) {
    op.parentNode.insertBefore(generateAvatarFromUsername(op), op);
  }

  const comments = getAllComments();

  for (const comment of comments) {
    const commentAuthor = comment.querySelector("a.hnuser");
    commentAuthor.parentElement.prepend(
      generateAvatarFromUsername(commentAuthor)
    );
  }

  return true;
}

const details = {
  id: "auto-generated-avatars",
  pages: {
    include: paths.comments,
    exclude: [],
  },
  loginRequired: false,
  init,
};

export default details;
