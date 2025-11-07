import { type FC, type ReactNode } from 'react';
import { Button } from '../base/buttons/button';
import CrossIcon from '@/icons/cross';

interface PopUpProps {
    title: string;
    subtitle?: string;
    content: ReactNode;
    onClose: () => void;
}

const PopUp: FC<PopUpProps> = ({ title, subtitle, content, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-[rgb(0,0,0,0.5)] z-50">
        <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6 relative">
            {/* Close button at top right corner */}
            <Button
                color="secondary"
                size="sm"
                iconLeading={<CrossIcon />}
                aria-label="Close PopUp"
                onClick={onClose}
                className="absolute top-4 right-4 p-2"
            />

            <h2 className="text-2xl font-bold mb-2 pt-12">{title}</h2>
            {subtitle && <h3 className="text-lg text-gray-600 mb-4">{subtitle}</h3>}
            
            <div className="text-gray-800 mb-6">{content}</div>
        </div>
    </div>
);

export default PopUp;