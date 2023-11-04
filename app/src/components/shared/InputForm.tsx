
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string

}

const InputForm: React.FC<InputProps> = ({ label, className, ...props }) => {
    return (
        <div className='flex bg-white pl-8 pr-60 justify-between items-center w-full '>
            <h2 className="w-full py-4 text-zinc-500">
                {label}
            </h2>
            <div className="w-full">
                <input className={` rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ${className}`}  {...props} />
            </div>
        </div>
    )
}

export default InputForm