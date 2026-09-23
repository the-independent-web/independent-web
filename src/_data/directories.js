import websites from "./websites.json" with { type: "json" };
import members from "./members.json" with { type: "json" };

export default websites.map((website) => {
    const author = members.find(
        (member) => member.id === website.authorId
    );

    return {
        ...website,
        author: author || null
    };
});