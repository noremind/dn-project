export function getQuestionNumber(questions, questionId) {
	if (!Array.isArray(questions) || !questionId) return 0;

	const index = questions.findIndex((item) => item.id === questionId);
	return index >= 0 ? index + 1 : 0;
}

export function getNextQuestionId(questions, currentQuestionId) {
	if (!Array.isArray(questions) || !currentQuestionId) return null;

	const index = questions.findIndex((item) => item.id === currentQuestionId);

	if (index < 0 || index >= questions.length - 1) return null;

	return questions[index + 1]?.id ?? null;
}

export function markQuestionAsAnswered(questions, questionId, answer) {
	if (!Array.isArray(questions) || !questionId) return questions;

	const index = questions.findIndex((item) => item.id === questionId);

	if (index < 0) return questions;

	const updatedQuestions = [...questions];
	updatedQuestions[index] = {
		...updatedQuestions[index],
		user_answer: answer ? [answer] : [],
		answered: Boolean(answer),
	};

	return updatedQuestions;
}
