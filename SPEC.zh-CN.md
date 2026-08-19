# CRPP 0.1 中文规范草案

版本：`0.1.0-draft.1`

语言：中文完整翻译；发生歧义时以英文 [SPEC.md](SPEC.md) 为 normative 版本

## 1. 状态与解释

本文定义 Context Rights & Portability Protocol 的最低规范行为，但不裁定法律所有权。实现者除遵守本协议外，还必须适用相关法律、合同、集体协议和第三方权利。

MUST、MUST NOT、SHOULD、SHOULD NOT 和 MAY 表示要求等级。稳定的规则 ID 属于规范的一部分，并由合规测试引用。

## 2. Actor 与 Authority Domain

Actor 可以是个人、组织、第三方控制者、托管运营者，或者在已认证权限下行动的自动化服务。

每个 Context Object 必须声明一个或多个 authority domain：

- `personal`
- `company`
- `joint`
- `third_party`

Authority domain 不是普遍财产所有权声明，而是定义允许操作、目的、来源、保留和授权的协议边界。

**CRPP-CORE-001 — 明确 Authority。** Context Object 如果没有明确的 authority domain、purpose，以及适用的 agreement 或默认规则引用，就不得被处理。

**CRPP-CORE-002 — 已认证 Actor。** CRPP 决策必须使用宿主环境认证的 actor identity。客户端自己提供的 actor 字符串不能单独建立权限。

## 3. 事前约定

**CRPP-AGREEMENT-001 — 约定时间。** 可携带副本、投影、训练、公开、商业化和项目后访问规则，应在 Context 产生前约定，最晚必须在第一次受治理写入时记录。

**CRPP-AGREEMENT-002 — 禁止事后单方扩权。** Context 产生后，任何 actor 不得单方面扩大自己的历史权利。后续 agreement 可以授予未来访问，但必须标明生效时间和同意者。

**CRPP-AGREEMENT-003 — 操作必须分开。** Agreement 必须区分读取、复制、投影、调用、训练、公开、商业化和再次授权。一种操作的权限不能推定包含另一种。

## 4. 无 Agreement 时的默认规则

**CRPP-DEFAULT-001 — 公司记录。** 组织可以保留在合法、已披露和已授权业务目的内产生的完整 canonical record。不得用本规则采集个人无关的私人 Context。

**CRPP-DEFAULT-002 — 自己的可分割贡献。** 贡献者可以保留能够独立分割、且不包含他人贡献、公司提供的秘密事实或第三方受保护内容的原始贡献。

**CRPP-DEFAULT-003 — 自己的可携带能力。** 只有通过全部必要检查后，贡献者才可以获得仅从自己 provenance scope 派生的 Portable Projection。

**CRPP-DEFAULT-004 — 不可分割的共同 Context。** 不可分割的共同 Context 必须进入 Joint Context Escrow，不得自动复制给任何参与者，包括自称或测量得出的主要贡献者。

**CRPP-DEFAULT-005 — 其他参与者。** 项目结束后，参与者不会自动获得他人的可分割贡献或共同原始 Context 副本。

## 5. 生成时 Portable Projection

Portable Projection 表达方法、检查清单、决策模式或工具调度技能等可复用能力，而不是公司事实的摘要。

**CRPP-PROJECTION-001 — 生成时路由。** 合规实现必须在受治理的生成管线中进行 authority 分类并建立候选投影，不能只在离职、项目结束或导出时处理。

**CRPP-PROJECTION-002 — 输入最小化。** Projection generator 只能获得派生被允许能力所必需的 provenance scope。

**CRPP-PROJECTION-003 — 必要检查。** Projection 写入 personal domain 前，必须检查直接标识、秘密、唯一数字或事件、metadata 泄漏、重识别风险和政策禁止内容。

**CRPP-PROJECTION-004 — 隔离。** 任何必要检查失败、不可用或无法确定时，projection 必须进入 quarantine。在授权复核形成 attestation 之前，不得写入 personal domain。

**CRPP-PROJECTION-005 — 禁止隐藏来源。** 个人投影不得包含泄漏受保护来源的原始路径、可恢复 embedding、隐藏字段、缓存或日志；可以包含不泄密的 provenance commitment。

**CRPP-PROJECTION-006 — 导出时复审。** 导出时必须重新检查当前政策、撤销状态和新发现的重识别风险。生成时通过不构成不可撤销的危险内容导出权。

## 6. Joint Context Escrow

**CRPP-ESCROW-001 — 默认托管。** 不可分割的共同 Context 必须留在受控托管域，除非有效且限定操作的 grant 允许其他处理。

**CRPP-ESCROW-002 — 受影响贡献者。** 每次请求必须从请求范围内的 provenance edges 解析 affected contributors，不能自动使用项目中的全部参与者。

**CRPP-ESCROW-003 — 少数保护。** 未获得受影响贡献者所需的同意，多数批准不得披露该贡献者的敏感或可识别贡献。

**CRPP-ESCROW-004 — 无关者不得阻断。** 对请求范围没有 provenance、隐私、合同或法律利益的 actor，不得拥有该范围的否决权。

**CRPP-ESCROW-005 — 优先 Compute-to-data。** 如果无需原始副本就能满足目的，实现应在受控环境执行请求，只释放经过检查的输出。

## 7. 第三方 Context

**CRPP-THIRD-001 — 独立 Authority。** 客户、用户、患者、合作方、数据主体或控制者的限制必须独立评估。贡献者之间的同意，包括全体一致，不能覆盖独立第三方要求。

**CRPP-THIRD-002 — 范围最小化。** 除非存在明确的合法基础和限定操作授权，第三方 Context 必须从个人投影中排除。

## 8. Access Grant

每个 Access Grant 必须标明 grantor、grantee、scope、operation、purpose、起止时间、调用或输出限制、训练权限、复制权限、再授权权限、撤销条件和完整性证明。

**CRPP-GRANT-001 — 拒绝不完整 Grant。** 缺少 purpose、scope、operation 或 expiry 的 grant 必须被拒绝。

**CRPP-GRANT-002 — 运行时执行。** 每次调用必须检查当前时间、剩余次数、撤销状态、actor identity、purpose 和请求操作。

**CRPP-GRANT-003 — 不可逆用途分开授权。** 原文复制、模型训练、公开发布、商业化和再次授权都需要明确授权；读取或调用权不能推定包含这些权利。

**CRPP-GRANT-004 — 输出控制。** Compute-to-data 输出必须通过声明的 output schema 和泄漏控制才可释放；失败输出必须扣留并记录审计。

## 9. 撤销与保留

**CRPP-REVOCATION-001 — 执行未来撤销。** 有效 revocation 生效后，必须阻止其覆盖范围内的未来操作。

**CRPP-REVOCATION-002 — 诚实说明限制。** 实现必须区分撤销未来权限、加密擦除、从活动索引删除，以及无法找回所有此前合法外部副本的现实限制。

**CRPP-REVOCATION-003 — 最小审计。** 除非法律要求删除，否则 revocation 不得删除证明后续访问已被拒绝所必需的最小审计证据。

## 10. 审计与决策

**CRPP-AUDIT-001 — 决策证据。** 创建、分类、投影、隔离、复核、授权、调用、拒绝、撤销和导出必须产生 append-only audit events。

**CRPP-AUDIT-002 — 数据最小化。** Audit event 必须记录稳定对象引用、rule IDs、决策结果和完整性证据，不得把受保护内容复制到日志。

**CRPP-AUDIT-003 — 可解释拒绝。** 拒绝必须返回稳定 rule IDs 和不敏感的理由，错误输出不得泄漏导致拒绝的受保护内容。

## 11. Conformance 声明

实现必须说明协议版本和 profile。初始 profiles 为：

- `CRPP 0.1 Core Compatible`
- `CRPP 0.1 Portable Projection Compatible`
- `CRPP 0.1 Joint Escrow Compatible`

没有发布或提供适用 conformance suite 的可验证结果，并声明未支持的 optional behavior 时，不得声称合规。

## 12. 安全与隐私边界

通过 CRPP 合规测试不代表法律合规、成功匿名化或生产安全。实现者必须维护与其数据和部署相适应的威胁模型。公开合规 fixtures 必须只包含合成数据。
