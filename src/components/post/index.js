import { useRef } from "react";
import Image from "./image";
import Footer from "./footer";
import Actions from "./actions";
import Comments from "./comments";

export default function Post({ content }) {
    const commentInput = useRef(null);
    const handleFocus = () => commentInput.current.focus();
    return (
        <div className="rounded col-span-4 border bg-white mb-16">
            <Image src={content.imageSrc} caption={content.caption} />
            <Actions docId={content.docId} totalLikes={content.likes.length} likedPhoto={content.userLikedPhoto} handleFocus={handleFocus} />
            <Footer caption={content.caption} username={content.username} />
            <Comments docId={content.docId} comments={content.comments} posted={content.dateCreated} commentInput={commentInput} />
        </div>
    );
}
