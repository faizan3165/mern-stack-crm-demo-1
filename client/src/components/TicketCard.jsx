import React from 'react';
import { Link } from 'react-router-dom';

import { AvatarDisplay, StatusDisplay, ProgressDisplay, DeleteBlock, PriorityDisplay } from '../components';

const TicketCard = ({ color, ticket }) => {
	return (
		<div className='ticket-card'>
			<Link to={`/ticket/${ticket.documentId}`} id='link'>
				<div className='ticket-color' style={{backgroundColor: color}} />
				<h3>{ticket.title}</h3>

				<AvatarDisplay ticket={ticket} />

				<StatusDisplay status={ticket.status} />

				<PriorityDisplay priority={ticket.priority} />

				<ProgressDisplay progress={ticket.progress} />
			</Link>

			<DeleteBlock documentId={ticket.documentId} />
		</div>
	);
};

export default TicketCard;
