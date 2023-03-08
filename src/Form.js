import { memo, useState, useEffect } from "react";
import { useData } from './data';
import { industries } from './helpers';

const label = "mb-2 block text-sm font-semibold";
const input = "bg-gray-200 border rounded  text-base font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2";

const Form = () => {

    const [industry, setIndustry] = useState('');
    const [question, setQuestion] = useState('');
    const [ready, setReady] = useState(false);
    const [formated, setFormated] = useState('');

    const { loading, search, error, responses } = useData();

    const onSelectChange = ({ target }) => {
        setIndustry(target.value);
    }

    useEffect(() => {
        if ((industry.length > 0) && (question.length > 0)) {
            setReady(true);
            let q = `As a business coach for a ${industry} ${question}`;
            setFormated(q);
        } else {
            setReady(false);
        }
    }, [industry, question])

    const renderOptions = () => industries.map(e => <option key={e} value={e}>{e}</option>)

    const onChange = ({ target }) => {
        setQuestion(target.value);
    }

    const handleSearch = () => {
        search(formated);
    }

    return (
        <div className="flex flex-col justify-center items-center h-[100vh]">
            <div className="relative flex flex-col items-center rounded-[20px] w-[700px] max-w-[95%] mx-auto bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white dark:!shadow-none p-3">
                <div className="mt-2 mb-8 w-full">
                    <section className="mt-2 px-2 text-base text-gray-600">
                        <section className="flex flex-col rounded-lg shadow-lg border-solid border border-stone-300 py-4 xs:px-6 sm:px-6 lg:px-8 modal-info">
                            <section className="relative flex justify-between my-3">
                                <h3 className="text-lg font-medium leading-6 text-gray-600" id="modal-title">ChatGPT Search</h3>
                            </section>
                            <section className="my-6 flex flex-col w-full">
                                <section className="w-full mb-4">
                                    <label className={label}>Industry:</label>
                                    <select disabled={loading} className={input} value={industry} onChange={onSelectChange}>
                                        <option>Select Industry</option>
                                        {renderOptions()}
                                    </select>

                                </section>
                                <section className="w-full mb-4">
                                    <label className={label}>Question:</label>
                                    <input disabled={loading} value={question} onChange={onChange} placeholder="Enter a question" type="text" className={input} />
                                </section>

                                {formated.length ? (
                                    <section className="w-full mb-4">
                                        <label className={label}>Formated Question:</label>
                                        <label className="text-green-500">{formated}</label>
                                    </section>
                                ) : null}

                                <section className="w-full my-4">
                                    <button disabled={loading || !ready} onClick={handleSearch} type="button" className="block text-center text-white bg-purple-700 hover:bg-purple-900 px-4 py-1.5 rounded disabled:bg-gray-200 disabled:text-gray-400">Submit Question</button>
                                </section>
                                {error ? (
                                    <section className="max-h-40 overflow-y-auto w-full bg-gray-100 rounded mb-3 p-6 text-red-600">
                                        {error}
                                    </section>
                                ) : null}
                                <section className="max-h-40 overflow-y-auto w-full bg-gray-100 rounded mb-3 p-6 text-gray-600">
                                    {responses?.length && !loading ? <>{responses}</> : <>{loading ? 'Processing...' : 'No Response'}</>}
                                </section>
                            </section>
                        </section>
                    </section>
                </div>

            </div>
            <p className="font-normal text-xs text-navy-700 mt-20 mx-auto w-max">By Focused.com</p>
        </div>
    )
}

export default memo(Form);
