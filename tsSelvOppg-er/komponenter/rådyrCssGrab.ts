type cssChapter = {
    chapterTitle: string,
    chapterProps: propCoordinate[]
}
type propCoordinate = {
    x: number,
    y: number
}

export function turnStringIntoObjectArray(clipPathStr: string) : cssChapter[] {
    return clipPathStr
        .split("/*")
        .map(chapter => chapter.trim())
        .filter(chapterContent => chapterContent.length !== 0)
        .map(chapterContent => ({
            chapterTitle: chapterContent.substring(0, chapterContent.indexOf("*/")),
            chapterProps: chapterContent
                .substring(chapterContent.indexOf("*/") + 2)
                .split(",")
                .map(prop => prop.trim().replaceAll("%", ""))
                .filter(prop => prop.length !== 0)
                .map(prop => ({
                    x: parseFloat(prop.split(" ")[0]),
                    y: parseFloat(prop.split(" ")[1])
                }))
        } as cssChapter));
}
export function turnObjArrayToCssString(cssChapterArr: cssChapter[]): string {
    return cssChapterArr
        .map(chapter =>
            `\n        /*${chapter.chapterTitle}*/ ${chapter.chapterProps
                .map(coor => `\n        ${coor.x}% ${coor.y}%`)
                .join(", ")}`
        ).filter((_, i, arr) => i !== arr.length - 1)
        .join(", ")
        + "\n        /*END - !! dette er fra objekt til string*/";
}
export function changePropsInsideCssChapterArray(cssChapterArr: cssChapter[], xCoorChange: Function, yCoorChange: Function): cssChapter[] {
    return cssChapterArr.map(chapter => 
        {
            const updatingChapterProps = chapter.chapterProps.map(prop => ({... prop, x: xCoorChange(prop.x), y: yCoorChange(prop.y)}));

            return {...chapter, chapterProps: updatingChapterProps}
        }
    )
}