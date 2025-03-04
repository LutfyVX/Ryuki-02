import { useEffect } from "react";
import SakanaWidget from "sakana-widget";
import "sakana-widget/lib/index.css";
import yourImage from '../assets/bocchiwidget.png'; // Pastikan path benar

const Sakana = () => {
    useEffect(() => {
        const customChar = SakanaWidget.getCharacter("chisato");
        if (customChar) {
            const char = {
                ...customChar,
                image: typeof yourImage === 'string' ? yourImage : yourImage.src
            };
            SakanaWidget.registerCharacter("custom", char);
        }

        new SakanaWidget({
            character: "custom",
            controls: false,
        }).mount("#sakana-widget");
    }, []);

    return (
        <div
        id="sakana-widget"
        style={{
        position: "fixed",
        bottom: "10px",
        right: "20px",
        width: "200px",
        height: "200px",
        zIndex: 1000,            }}
    ></div>
    );
};

export default Sakana;
