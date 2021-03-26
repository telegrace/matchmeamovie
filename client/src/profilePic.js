// pass 'props' as an argument to get access to the info being passed down from the parent (App)
// we can also use destructuring to pull up the properties inside props
export default function ProfilePic({
    imageUrl,
    toggleUploader,
    position = "middle",
}) {
    //console.log("GRACE props in ProfilePic: ", props);

    imageUrl = imageUrl || "default.png";
    //position "rightCorner", "middle" is the default, but can be changed via props
    const positionClasses = position == "middle" ? "middle" : "right-corner";
    return (
        <div className="profile-pic">
            <img
                id={`${positionClasses}`}
                src={imageUrl}
                onClick={() => toggleUploader()}
            />
        </div>
    );
}

/*
<h2>
    This is a ProfilePic component and my name is {first} and my
    last name is {last}.
</h2>
*/
