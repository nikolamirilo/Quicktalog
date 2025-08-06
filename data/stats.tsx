import { BsBarChartFill, BsFillStarFill } from "react-icons/bs";
import { PiGlobeFill } from "react-icons/pi";
import { FiClock, FiUsers, FiZap, FiSmartphone } from "react-icons/fi";

import { IStats } from "@/types";

export const stats: IStats[] = [
    {
        title: "5 Minutes",
        icon: <FiClock size={34} className="text-product-primary" />,
        description: "Average time to create your first digital catalog."
    },
    {
        title: "Any Industry",
        icon: <FiUsers size={34} className="text-product-primary" />,
        description: "Perfect for any business that needs to showcase products or services."
    },
    {
        title: "OCR Import",
        icon: <FiZap size={34} className="text-product-primary" />,
        description: "Convert existing paper catalogs instantly with AI technology."
    }
];