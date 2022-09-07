# Checklist

Ajustes
- quando for criar usuario no banco, ajustar para calcular e salvar o "modelId"
- ajustar back-end para que as "questions" tenham "id" único e INTEIRO

Adicionar no lr.py:
#167  iso_date = iso_date.replace(":", "-")

-- IRT: Encoding “User i answered Item j”
  python encode.py --dataset tcc02 --users --items
-- PFA: Enconding "how many successes of user i over skill k (Fik : #failures)"
  python encode.py --dataset tcc02 --skills --wins --fails
  python encode.py --dataset tcc_unificado --skills --wins --fails
  python encode.py --dataset tcc_semi_unificado --skills --wins --fails
  python encode.py --dataset tcc_granular --skills --wins --fails

-- Logistic Regression (IRT: user+item):
  python lr.py data/tcc02/X-ui.npz

-- Logistic Regression (PFA: { skill, wins, fails }):
  python lr.py data/tcc02/X-swf.npz
  python tcc_lr.py data/tcc02/X-swf.npz
  python tcc_lr.py data/tcc_unificado/X-swf.npz --model unificado
  python tcc_lr.py data/tcc_semi_unificado/X-swf.npz --model semi_unificado
  python tcc_lr.py data/tcc_granular/X-swf.npz --model granular

-- Factorization Machines of size d = 5 ({ skill, wins, fails }):
  python fm.py --d 5 data/tcc02/X-swf.npz


-- Upload models
  py tcc_database.py --dataset tcc_unificado --cd_model unificado --action upload
  py tcc_database.py --dataset tcc_semi_unificado --cd_model semi_unificado --action upload
  py tcc_database.py --dataset tcc_granular --cd_model granular --action upload

Download models
  py tcc_database.py --dataset tcc_unificado --cd_model unificado --action download
  py tcc_database.py --dataset tcc_semi_unificado --cd_model semi_unificado --action download
  py tcc_database.py --dataset tcc_granular --cd_model granular --action download




- Criar um exercicio para cada Lição/Can-do
- Ajustar exibição do Exercício e Questão
- Consulta aos Relatórios de cada Can-do/Lição
- Ajustar exibição da página Home
- Implementar Rotas com Router V6?
- Implementar algoritmo que vai avaliar os dados

- Criar mais exercícios para cada Lição/Can-do
-- Selecionar aleatoriamente qual exercício vai ser feito: NÃO FARÁ TODOS OS EXERCÍCIOS


-https://devcenter.heroku.com/articles/git