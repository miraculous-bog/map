import React from 'react';
import styles from './Modal.module.css';
import useSWR from 'swr';
import { Link } from 'react-router-dom';

const fetcher = (path) => fetch(path).then((response) => response.json());

const Modal = ({ visible, setVisible, id }) => {
	const { data, error } = useSWR('http://localhost:8080/station/details/' + id, fetcher);
	const rootClasses = [styles.modal];
	if (visible) rootClasses.push(styles.active);
	const availableFuels = data?.availableFuelsDescription?.split('\n').filter((line) => !!line);

	return (
		<div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
			<div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
				<div className="flex flex-col">
					<div className="flex flex-col">
						<strong className="mt-1">{data?.name}</strong>
						<strong className="mt-1">{data?.address}</strong>
					</div>
					<div className="flex mt-1">
						<strong>Гаряча лінія:</strong>
						<p className="pl-1 text-blue-600 underline">{data?.hotLine}</p>
					</div>
					<div>
						<p></p>
					</div>
					<div className="flex mt-1">
						<strong>Графік роботи: </strong>
						<p className="pl-1">{data?.schedule}</p>
					</div>
					{availableFuels?.length > 0 ? (
						<div className="flex flex-col mt-1">
							<div>
								<strong>Доступне пальне:</strong>
							</div>
							<div className="pl-10">
								<ul>
									{availableFuels?.map((info, i) => (
										<li key={i} className="list-disc">
											{info}
										</li>
									))}
								</ul>
							</div>
						</div>
					) : (
						<></>
					)}
					{data?.additionalInfo ? (
						<div className="flex flex-col mt-1">
							<strong>Додаткова інформація:</strong>
							<div className="pl-10">{data.additionalInfo}</div>
						</div>
					) : (
						<></>
					)}
					<div className="flex justify-between mt-4">
						<div className="border rounded-md">
							<Link to={data?.link || '/error'} target="_blank" className="p-2 underline text-blue-600">
								{data?.linkName}
							</Link>
						</div>
						<div className={'border rounded-md ' + (data?.lastUpdate ? '' : 'hidden')}>
							<span className="p-2">{data?.lastUpdate}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Modal;